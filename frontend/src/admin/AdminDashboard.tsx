import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Order {
  id: number;
  customer_name: string;
  email: string;
  whatsapp: string;
  total_amount: number;
  status: 'pending' | 'paid' | 'fulfilled';
  items: any[];
}

const AdminDashboard: React.FC<{ token: string }> = ({ token }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState('all');

  const fetchOrders = async () => {
    const res = await axios.get(`/api/admin/orders${filter !== 'all' ? `?status=${filter}` : ''}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setOrders(res.data.data);
  };

  useEffect(() => {
    fetchOrders();
  }, [filter]);

  const updateStatus = async (id: number, status: string) => {
    await axios.patch(`/api/admin/orders/${id}`, { status }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchOrders();
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

      <div className="mb-4 space-x-4">
        <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-black text-white' : 'bg-gray-200'}`}>All</button>
        <button onClick={() => setFilter('pending')} className={`px-4 py-2 rounded ${filter === 'pending' ? 'bg-black text-white' : 'bg-gray-200'}`}>Pending</button>
        <button onClick={() => setFilter('paid')} className={`px-4 py-2 rounded ${filter === 'paid' ? 'bg-black text-white' : 'bg-gray-200'}`}>Paid</button>
        <button onClick={() => setFilter('fulfilled')} className={`px-4 py-2 rounded ${filter === 'fulfilled' ? 'bg-black text-white' : 'bg-gray-200'}`}>Fulfilled</button>
      </div>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Customer</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td className="border p-2">{order.id}</td>
              <td className="border p-2">
                {order.customer_name}<br/>
                <span className="text-sm text-gray-500">{order.whatsapp}</span>
              </td>
              <td className="border p-2">₦{Number(order.total_amount).toLocaleString()}</td>
              <td className="border p-2 uppercase text-sm font-bold">{order.status}</td>
              <td className="border p-2 space-x-2">
                {order.status === 'paid' && (
                  <button onClick={() => updateStatus(order.id, 'fulfilled')} className="bg-green-500 text-white px-2 py-1 rounded text-sm">Mark Fulfilled</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
