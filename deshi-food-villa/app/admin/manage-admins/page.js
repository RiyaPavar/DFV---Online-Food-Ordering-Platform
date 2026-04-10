'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function ManageAdminsPage() {
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState('');

  const fetchAdmins = async () => {
    try {
      const res = await api.get('/admin/approved');  // ✅ fixed path
      setAdmins(res.data);
    } catch (err) {
      setError('Failed to fetch admins');
    }
  };

  const handleRemove = async (id) => {
    if (!confirm('Are you sure you want to remove this admin?')) return;
    try {
      await api.delete(`/admin/remove/${id}`);  // ✅ fixed path
      fetchAdmins();
    } catch (err) {
      setError('Failed to remove admin');
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-red-600">Approved Admins</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="space-y-4">
        {admins.map((admin) => (
          <div key={admin._id} className="p-4 bg-white shadow rounded flex justify-between items-center">
            <div>
              <p><strong>{admin.name}</strong> ({admin.email})</p>
              <p className="text-sm text-gray-600">Role: {admin.role}</p>
            </div>
            <button
              onClick={() => handleRemove(admin._id)}
              className="text-red-600 hover:underline text-sm"
            >
              Remove Admin
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
