import orderModel from "../models/orderModel";
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
                    currency: "inr",
                    product_data: {
                        name: item.name,
                        images: [item.image],
                    },
                    unit_amount: item.price * 100*80,
                },
                quantity: item.quantity,
            };
        });
        line_imtems.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: 2*100*80,
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url:`${frontend_url}/verify?success=true%orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
            
        });

        res.status(200).json({ success: true,session_url:session.url });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }

}
export { placeOrder };