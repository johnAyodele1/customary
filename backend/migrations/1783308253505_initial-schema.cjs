/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  // Categories table
  pgm.createTable('categories', {
    id: 'id',
    name: { type: 'varchar(255)', notNull: true },
    slug: { type: 'varchar(255)', notNull: true, unique: true },
    description: { type: 'text' },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  // Category fields configuration
  pgm.createTable('category_fields', {
    id: 'id',
    category_id: {
      type: 'integer',
      notNull: true,
      references: '"categories"',
      onDelete: 'CASCADE',
    },
    field_type: { type: 'varchar(50)', notNull: true }, // 'text', 'image', 'select', etc.
    label: { type: 'varchar(255)', notNull: true },
    required: { type: 'boolean', notNull: true, default: false },
    options: { type: 'jsonb' }, // For select fields
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  // Orders table
  pgm.createTable('orders', {
    id: 'id',
    order_token: { type: 'varchar(255)', notNull: true, unique: true },
    status: { type: 'varchar(50)', notNull: true, default: 'pending' }, // pending, paid, fulfilled
    customer_name: { type: 'varchar(255)', notNull: true },
    address: { type: 'text', notNull: true },
    whatsapp: { type: 'varchar(50)', notNull: true },
    email: { type: 'varchar(255)', notNull: true },
    total_amount: { type: 'numeric(12, 2)', notNull: true },
    paystack_reference: { type: 'varchar(255)', unique: true },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  // Order items table
  pgm.createTable('order_items', {
    id: 'id',
    order_id: {
      type: 'integer',
      notNull: true,
      references: '"orders"',
      onDelete: 'CASCADE',
    },
    category_id: {
      type: 'integer',
      notNull: true,
      references: '"categories"',
    },
    customization_data: { type: 'jsonb', notNull: true },
    image_urls: { type: 'jsonb' },
    price: { type: 'numeric(12, 2)', notNull: true },
    quantity: { type: 'integer', notNull: true, default: 1 },
  });

  // Create indexes
  pgm.createIndex('category_fields', 'category_id');
  pgm.createIndex('orders', 'order_token');
  pgm.createIndex('order_items', 'order_id');
};

exports.down = pgm => {
  pgm.dropTable('order_items');
  pgm.dropTable('orders');
  pgm.dropTable('category_fields');
  pgm.dropTable('categories');
};
