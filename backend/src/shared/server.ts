import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

import productsRoutes from '../products/products.routes.js';
app.use('/api/products', productsRoutes);

import checkoutRoutes from '../checkout/checkout.routes.js';
app.use('/api/checkout', checkoutRoutes);

import paymentsRoutes from '../payments/payments.routes.js';
app.use('/api/payments', paymentsRoutes);

import adminRoutes from '../admin/admin.routes.js';
app.use('/api/admin', adminRoutes);

import mediaRoutes from '../media/media.routes.js';
app.use('/api/media', mediaRoutes);

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
