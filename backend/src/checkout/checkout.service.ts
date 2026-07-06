import { query } from '../shared/db.js';
import crypto from 'crypto';

export const createDraftOrder = async (orderData: any) => {
  const { customer_name, address, whatsapp, email, items } = orderData;
  const order_token = crypto.randomBytes(16).toString('hex');
  const total_amount = items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);

  const client = await query('BEGIN');
  try {
    const orderResult = await query(
      `INSERT INTO orders (order_token, customer_name, address, whatsapp, email, total_amount)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [order_token, customer_name, address, whatsapp, email, total_amount]
    );
    const order = orderResult.rows[0];

    for (const item of items) {
      await query(
        `INSERT INTO order_items (order_id, category_id, customization_data, image_urls, price, quantity)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [order.id, item.category_id, item.customization_data, JSON.stringify(item.image_urls || []), item.price, item.quantity]
      );
    }

    await query('COMMIT');
    return order;
  } catch (error) {
    await query('ROLLBACK');
    throw error;
  }
};

export const getOrderByToken = async (token: string) => {
  const result = await query(`
    SELECT o.*,
      COALESCE(json_agg(oi.*) FILTER (WHERE oi.id IS NOT NULL), '[]') as items
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    WHERE o.order_token = $1
    GROUP BY o.id
  `, [token]);
  return result.rows[0];
};

export const updateOrderStatus = async (reference: string, status: string) => {
  return query('UPDATE orders SET status = $1 WHERE paystack_reference = $2', [status, reference]);
};

export const setOrderReference = async (id: number, reference: string) => {
  return query('UPDATE orders SET paystack_reference = $1 WHERE id = $2', [reference, id]);
};
