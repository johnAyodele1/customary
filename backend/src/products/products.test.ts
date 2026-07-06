import request from 'supertest';
import app from '../shared/server.js';
import pool from '../shared/db.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'adminsecret';

describe('Products Feature', () => {
  let adminToken: string;

  beforeAll(async () => {
    adminToken = jwt.sign({ role: 'admin' }, JWT_SECRET);
    await pool.query('DELETE FROM category_fields');
    await pool.query('DELETE FROM categories');
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('POST /api/products', () => {
    it('should create a new category with fields when authorized', async () => {
      const res = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Necklaces',
          slug: 'necklaces',
          description: 'Custom necklaces',
          fields: [
            { field_type: 'text', label: 'Engraving', required: true },
            { field_type: 'image', label: 'Reference Image', required: false }
          ]
        });

      expect(res.status).toBe(201);
      expect(res.body.status).toBe('success');
      expect(res.body.data.name).toBe('Necklaces');
      expect(res.body.data.fields).toHaveLength(2);
    });

    it('should return 401 when unauthorized', async () => {
      const res = await request(app)
        .post('/api/products')
        .send({ name: 'Unauthorized' });
      expect(res.status).toBe(401);
    });

    it('should return 400 for invalid data when authorized', async () => {
      const res = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: '' });

      expect(res.status).toBe(400);
      expect(res.body.status).toBe('error');
    });
  });

  describe('GET /api/products', () => {
    it('should list all categories', async () => {
      const res = await request(app).get('/api/products');
      expect(res.status).toBe(200);
      expect(res.body.data).toBeInstanceOf(Array);
      expect(res.body.data.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/products/:slug', () => {
    it('should get a category by slug', async () => {
      const res = await request(app).get('/api/products/necklaces');
      expect(res.status).toBe(200);
      expect(res.body.data.slug).toBe('necklaces');
    });

    it('should return 404 for non-existent category', async () => {
      const res = await request(app).get('/api/products/non-existent');
      expect(res.status).toBe(404);
    });
  });
});
