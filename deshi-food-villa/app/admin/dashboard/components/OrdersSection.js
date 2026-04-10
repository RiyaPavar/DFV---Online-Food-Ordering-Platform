'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await api.get('/orders');
      setOrders(res.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      await api.put(`/orders/${orderId}`, { status });
      fetchOrders();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const statusColors = {
    'placed': 'bg-blue-100 text-blue-800',
    'preparing': 'bg-yellow-100 text-yellow-800',
    'out for delivery': 'bg-purple-100 text-purple-800',
    'delivered': 'bg-green-100 text-green-800',
    'cancelled': 'bg-red-100 text-red-800'
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Orders Management</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <svg className="animate-spin h-12 w-12 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{order.userId?.name || 'Guest'}</p>
                    <p className="text-sm text-gray-500">Order #{order._id.slice(-6).toUpperCase()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">₹{order.totalPrice}</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status] || 'bg-gray-100 text-gray-800'}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">Payment:</span>
                  <span className={`font-medium ${
                    order.paymentStatus === 'paid' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {order.paymentStatus}
                  </span>
                </div>
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-gray-500">Ordered at:</span>
                  <span>{new Date(order.createdAt).toLocaleString()}</span>
                </div>
                
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Update Status</h3>
                  <div className="flex flex-wrap gap-2">
                    {['placed', 'preparing', 'out for delivery', 'delivered'].map((status) => (
                      <button
                        key={status}
                        onClick={() => updateStatus(order._id, status)}
                        className={`px-3 py-1 text-xs rounded-full ${
                          order.status === status 
                            ? 'bg-red-600 text-white' 
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}