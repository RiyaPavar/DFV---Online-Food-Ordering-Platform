'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
  try {
    const res = await api.get('/orders'); // automatically sends token
    setOrders(res.data);
  } catch (err) {
    console.error('Error fetching orders:', err);
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

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-red-600">All Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-white p-4 shadow rounded">
            <p><strong>User:</strong> {order.userId.name}</p>
            <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Payment:</strong> {order.paymentStatus}</p>
            <p><strong>Ordered at:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            <div className="mt-2 space-x-2">
              {['placed', 'preparing', 'out for delivery', 'delivered'].map((status) => (
                <button
                  key={status}
                  onClick={() => updateStatus(order._id, status)}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                >
                  Mark as {status}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
