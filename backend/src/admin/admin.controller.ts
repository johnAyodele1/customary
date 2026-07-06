import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import * as adminService from './admin.service.js';

const JWT_SECRET = process.env.JWT_SECRET || 'adminsecret';

export const login = async (req: Request, res: Response) => {
  const { password } = req.body;
  const adminHashedPassword = process.env.ADMIN_PASSWORD;

  const isMatch = await bcrypt.compare(password, adminHashedPassword || '');
  if (!isMatch) {
    return res.status(401).json({ status: 'error', message: 'Invalid password' });
  }

  const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ status: 'success', data: { token } });
};

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ status: 'error', message: 'Not authorized' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ status: 'error', message: 'Invalid token' });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const status = req.query.status as string;
    const orders = await adminService.getAllOrders(status);
    res.json({ status: 'success', data: orders });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Failed to fetch orders' });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await adminService.updateOrder(Number(id), status);
    if (!order) {
      return res.status(404).json({ status: 'error', message: 'Order not found' });
    }
    res.json({ status: 'success', data: order });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Failed to update order' });
  }
};
