import { query } from '../shared/db.js';

export const getAllCategories = async () => {
  const result = await query(`
    SELECT c.*,
      COALESCE(json_agg(cf.*) FILTER (WHERE cf.id IS NOT NULL), '[]') as fields
    FROM categories c
    LEFT JOIN category_fields cf ON c.id = cf.category_id
    GROUP BY c.id
  `);
  return result.rows;
};

export const getCategoryBySlug = async (slug: string) => {
  const result = await query(`
    SELECT c.*,
      COALESCE(json_agg(cf.*) FILTER (WHERE cf.id IS NOT NULL), '[]') as fields
    FROM categories c
    LEFT JOIN category_fields cf ON c.id = cf.category_id
    WHERE c.slug = $1
    GROUP BY c.id
  `, [slug]);
  return result.rows[0];
};

export const createCategory = async (name: string, slug: string, description: string, fields: any[]) => {
  const result = await query(
    'INSERT INTO categories (name, slug, description) VALUES ($1, $2, $3) RETURNING *',
    [name, slug, description]
  );
  const category = result.rows[0];

  if (fields && fields.length > 0) {
    for (const field of fields) {
      await query(
        'INSERT INTO category_fields (category_id, field_type, label, required, options) VALUES ($1, $2, $3, $4, $5)',
        [category.id, field.field_type, field.label, field.required, field.options]
      );
    }
  }

  return getCategoryBySlug(slug);
};

export const removeCategory = async (id: number) => {
  await query('DELETE FROM categories WHERE id = $1', [id]);
};
