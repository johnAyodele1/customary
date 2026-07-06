import React, { useState } from 'react';
import axios from 'axios';

const AdminLogin: React.FC<{ onLogin: (token: string) => void }> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/admin/login', { password });
      onLogin(res.data.data.token);
    } catch (err) {
      setError('Invalid password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <input
          type="password"
          placeholder="Admin Password"
          className="w-full border p-2 mb-4 rounded"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button type="submit" className="w-full bg-black text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
