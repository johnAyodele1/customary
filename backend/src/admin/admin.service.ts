import { query } from '../shared/db.js';

export const getAllOrders = async (status?: string) => {
  let sql = `
    SELECT o.*,
      COALESCE(json_agg(json_build_object(
        'id', oi.id,
        'category_id', oi.category_id,
        'category_name', c.name,
        'customization_data', oi.customization_data,
        'image_urls', oi.image_urls,
        'price', oi.price,
        'quantity', oi.quantity
      )) FILTER (WHERE oi.id IS NOT NULL), '[]') as items
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    LEFT JOIN categories c ON oi.category_id = c.id
  `;
  const params = [];
  if (status) {
    sql += ' WHERE o.status = $1';
    params.push(status);
  }
  sql += ' GROUP BY o.id ORDER BY o.created_at DESC';

  const result = await query(sql, params);
  return result.rows;
};

export const updateOrder = async (id: number, status: string) => {
  const result = await query(
    'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
    [status, id]
  );
  return result.rows[0];
};
