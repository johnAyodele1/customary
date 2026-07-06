import request from 'supertest';
import app from '../shared/server.js';
import pool from '../shared/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'adminsecret';

describe('Admin Feature', () => {
  let adminToken: string;

  beforeAll(async () => {
    await pool.query('DELETE FROM orders');
    const password = 'password123';
    const hash = await bcrypt.hash(password, 10);
    process.env.ADMIN_PASSWORD = hash;

    adminToken = jwt.sign({ role: 'admin' }, JWT_SECRET);
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('POST /api/admin/login', () => {
    it('should login with correct password', async () => {
      const res = await request(app)
        .post('/api/admin/login')
        .send({ password: 'password123' });

      expect(res.status).toBe(200);
      expect(res.body.data.token).toBeDefined();
    });

    it('should return 401 with incorrect password', async () => {
      const res = await request(app)
        .post('/api/admin/login')
        .send({ password: 'wrong' });

      expect(res.status).toBe(401);
    });
  });

  describe('GET /api/admin/orders', () => {
    it('should return 401 without token', async () => {
      const res = await request(app).get('/api/admin/orders');
      expect(res.status).toBe(401);
    });

    it('should return orders with token', async () => {
      const res = await request(app)
        .get('/api/admin/orders')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data).toBeInstanceOf(Array);
    });
  });
});
