import { Request, Response, NextFunction } from 'express';
import { createPaypalOrder, capturePaypalOrder, CreatePaypalOrderPayload } from '../services/paypal.service';

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderData = req.body as CreatePaypalOrderPayload;
    const order = await createPaypalOrder(orderData);
    return res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

export const captureOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orderId } = req.params;
    const result = await capturePaypalOrder(orderId);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
