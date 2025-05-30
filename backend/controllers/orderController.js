import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
    const frontend_url ="http://localhost:5173";
    try {
        const { items, amount, address } = req.body;
        const userId = req.userId;
    
        // Create a new order
        const newOrder = new orderModel({
        userID: userId,
        items,
        amount,
        address,
        });
    
        // Save the order to the database
        await newOrder.save();
    
        // Update the user's cart data
        const userData = await userModel.findById(userId);
        userData.cartData = {};
        await userData.save();
        
        const line_items= items.map((item) => {
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: Math.round(item.price * 100),
                },
                quantity: item.quantity,
            };
        });
        line_items.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: 2*100,
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
            
        });

        res.status(200).json({ success: true, session_url: session.url });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
    };
    const verifyOrder = async (req, res) => {
       const { success, orderId } = req.body;
       try {
           if(success=== "true"){
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.status(200).json({ success: true, message: "Payment successful" });
           } else {
               await orderModel.findByIdAndDelete(orderId);
                res.status(200).json({ success: false, message: "Payment failed" });
           }
       } catch (error) {
           console.error("Error verifying order:", error);
           res.status(500).json({ success: false, message: "Internal server error" });
       }
   };

// user order
const userOrders= async (req, res) => {
    const userId = req.userId;
    try {
        const orders = await orderModel.find({ userID: userId });
        if (orders.length > 0) {
            res.status(200).json({ success: true, data:orders });
        } else {
            res.status(404).json({ success: false, message: "No orders found" });
        }
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
// admin order
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find();
        if (orders.length > 0) {
            res.status(200).json({ success: true, data: orders });
        } else {
            res.status(404).json({ success: false, message: "No orders found" });
        }
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
// api for update order
const updateStatus = async (req, res) => {
    const { orderId, status } = req.body;
    try {
        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        order.status = status;
        await order.save();
        res.status(200).json({ success: true, message: "Order status updated successfully" });
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
export { placeOrder, verifyOrder, userOrders , listOrders , updateStatus};