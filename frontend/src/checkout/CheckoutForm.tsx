import React, { useState } from 'react';
import axios from 'axios';

interface CartItem {
  category_id: number;
  category_name: string;
  price: number;
  quantity: number;
  customization_data: Record<string, any>;
}

const CheckoutForm: React.FC<{ items: CartItem[] }> = ({ items }) => {
  const [formData, setFormData] = useState({
    customer_name: '',
    address: '',
    whatsapp: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/checkout', {
        ...formData,
        items,
      });

      if (response.data.status === 'success') {
        // Redirect to Paystack
        window.location.href = response.data.data.payment_url;
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      <div>
        <label className="block text-sm font-medium">Full Name</label>
        <input
          type="text"
          required
          className="w-full border rounded p-2"
          value={formData.customer_name}
          onChange={e => setFormData({ ...formData, customer_name: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Delivery Address</label>
        <textarea
          required
          className="w-full border rounded p-2"
          value={formData.address}
          onChange={e => setFormData({ ...formData, address: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">WhatsApp Number (e.g. +234...)</label>
        <input
          type="tel"
          required
          placeholder="+234..."
          className="w-full border rounded p-2"
          value={formData.whatsapp}
          onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Email Address (for receipt)</label>
        <input
          type="email"
          required
          className="w-full border rounded p-2"
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white py-3 rounded font-bold hover:bg-primary-dark transition"
      >
        {loading ? 'Initializing Payment...' : 'Proceed to Payment'}
      </button>
    </form>
  );
};

export default CheckoutForm;
