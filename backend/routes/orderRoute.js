import express from 'express';
import { placeOrder,userOrders,verifyOrder,listOrders } from '../controllers/orderController.js';
import authMiddleware from '../middleware/auth.js';

const orderRouter = express.Router();
orderRouter.post('/place', authMiddleware, placeOrder);
orderRouter.post('/verify', verifyOrder);
orderRouter.post('/userorders', authMiddleware, userOrders);
orderRouter.get('/list', listOrders); // Assuming you want to list all orders for admin
export default orderRouter;