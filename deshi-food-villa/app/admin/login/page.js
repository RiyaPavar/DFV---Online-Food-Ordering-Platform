'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await api.post('/auth/login', { email, password });
      const { token, user } = res.data;

      if (user.role !== 'admin' && user.role !== 'master') {
        return setError('Access denied: Not an admin');
      }

      localStorage.setItem('adminToken', token);
      localStorage.setItem('adminName', user.name);
      localStorage.setItem('adminRole', user.role);
      router.push('/admin/dashboard');
    } catch (err) {
      setError(err?.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-white to-red-50 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded-lg w-full max-w-md p-8 transition-all duration-300 border-t-4 border-red-600"
      >
        <h2 className="text-3xl font-bold text-center text-red-600 mb-6">Admin Login</h2>

        {error && (
          <p className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded text-sm animate-pulse">
            {error}
          </p>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="admin@example.com"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="********"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition-all duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
}
