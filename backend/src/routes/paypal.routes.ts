import express from 'express';
import { createOrder, captureOrder } from '../controllers/paypal.controller';

export const paypalRouter = express.Router();

paypalRouter.post('/create-order', createOrder);
paypalRouter.post('/capture-order/:orderId', captureOrder);
