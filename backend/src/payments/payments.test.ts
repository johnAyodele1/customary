import request from 'supertest';
import app from '../shared/server.js';
import pool from '../shared/db.js';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY || 'dummy';

describe('Payments Webhook', () => {
  let orderId: number;
  const reference = 'test-paystack-ref';

  beforeAll(async () => {
    await pool.query('DELETE FROM order_items');
    await pool.query('DELETE FROM orders');
    await pool.query('DELETE FROM categories');

    const catRes = await pool.query(
      "INSERT INTO categories (name, slug) VALUES ('Mugs', 'mugs') RETURNING id"
    );
    const categoryId = catRes.rows[0].id;

    const orderRes = await pool.query(
      `INSERT INTO orders (order_token, customer_name, address, whatsapp, email, total_amount, paystack_reference)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      ['token123', 'Jane Doe', 'Address', '+2341234567', 'jane@example.com', 1000, reference]
    );
    orderId = orderRes.rows[0].id;
  });

  afterAll(async () => {
    await pool.end();
  });

  it('should update order status to paid on success webhook', async () => {
    const payload = {
      event: 'charge.success',
      data: {
        reference: reference,
        status: 'success',
        amount: 100000,
      },
    };

    const signature = crypto
      .createHmac('sha512', PAYSTACK_SECRET)
      .update(JSON.stringify(payload))
      .digest('hex');

    const res = await request(app)
      .post('/api/payments/webhook')
      .set('x-paystack-signature', signature)
      .send(payload);

    if (res.status !== 200) {
      console.log(JSON.stringify(res.body, null, 2));
    }

    expect(res.status).toBe(200);

    const orderRes = await pool.query('SELECT status FROM orders WHERE id = $1', [orderId]);
    expect(orderRes.rows[0].status).toBe('paid');
  });

  it('should return 400 for invalid signature', async () => {
    // Note: Zod validation might fail before signature check if headers are missing
    const res = await request(app)
      .post('/api/payments/webhook')
      .set('x-paystack-signature', 'invalid')
      .send({
        event: 'charge.success',
        data: {
          reference: 'ref',
          status: 'success',
          amount: 1000,
        },
      });

    expect(res.status).toBe(400);
  });
});
