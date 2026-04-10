'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

export default function AdminRequests() {
  const [requests, setRequests] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    } else {
      fetchRequests();
    }
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await api.get('/admin/requests');
      setRequests(res.data);
    } catch (err) {
      console.error('Failed to fetch requests:', err);
    }
  };

  const approveRequest = async (id) => {
    try {
      await api.put(`/admin/approve/${id}`);
      fetchRequests();
    } catch (err) {
      console.error('Failed to approve:', err);
    }
  };

  const rejectRequest = async (id) => {
    try {
      await api.delete(`/admin/remove/${id}`);
      fetchRequests();
    } catch (err) {
      console.error('Failed to reject:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4 text-red-600">Pending Admin Requests</h1>
      {requests.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        <div className="grid gap-4">
          {requests.map((user) => (
            <div key={user._id} className="bg-white p-4 shadow rounded flex justify-between items-center">
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => approveRequest(user._id)}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={() => rejectRequest(user._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
