import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CategoryList from './products/CategoryList';
import CheckoutForm from './checkout/CheckoutForm';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import { useState } from 'react';

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('adminToken'));

  const handleLogin = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('adminToken', newToken);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow p-4 mb-8">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">CUSTOMRY ATELIER</h1>
            <nav className="space-x-4">
              <a href="/" className="hover:text-primary">Home</a>
              <a href="/admin" className="hover:text-primary">Admin</a>
            </nav>
          </div>
        </header>

        <main className="container mx-auto px-4">
          <Routes>
            <Route path="/" element={<CategoryList />} />
            <Route path="/checkout" element={<CheckoutForm items={[]} />} />
            <Route
              path="/admin"
              element={token ? <AdminDashboard token={token} /> : <AdminLogin onLogin={handleLogin} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
