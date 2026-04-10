'use client';
import { useState, useEffect } from 'react';
import api from '@/lib/api';

export default function AdminItemsPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: null
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Starter');
  const [modalOpen, setModalOpen] = useState(false);

  const categories = ['Starter', 'Main Course', 'Dessert', 'Drinks'];

  const fetchItems = async () => {
    try {
      const res = await api.get('/items');
      setItems(res.data);
    } catch {
      setError('Failed to fetch items');
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const openModal = () => {
    setForm({ name: '', price: '', description: '', category: '', image: null });
    setPreviewImage(null);
    setEditingId(null);
    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      setForm((prev) => ({ ...prev, image: file }));
      setPreviewImage(file ? URL.createObjectURL(file) : null);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('price', form.price);
    formData.append('description', form.description);
    formData.append('category', form.category);
    if (form.image) {
      formData.append('image', form.image);
    }

    try {
      if (editingId) {
        await api.put(`/items/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await api.post('/items/add', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      fetchItems();
      setModalOpen(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save item');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setForm({
      name: item.name,
      price: item.price,
      description: item.description,
      category: item.category,
      image: null
    });
    setPreviewImage(item.img);
    setEditingId(item._id);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this item?')) {
      await api.delete(`/items/${id}`);
      fetchItems();
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-green-700 text-center">Admin: Manage Food Items</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Add Item Button */}
      <div className="text-center mb-6">
        <button onClick={openModal} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          + Add Item
        </button>
      </div>

      {/* Category & Items Display */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4 bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-3">Categories</h2>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`block w-full text-left px-3 py-2 mb-1 rounded ${selectedCategory === cat ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">{selectedCategory} Items</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {items.filter(i => i.category === selectedCategory).map(item => (
              <div key={item._id} className="bg-white p-4 rounded shadow flex gap-4">
                {item.img && <img src={item.img} alt={item.name} className="w-24 h-24 object-cover rounded" />}
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <p className="text-sm text-gray-800 font-semibold">₹{item.price}</p>
                  </div>
                  <div className="mt-2 space-x-3">
                    <button onClick={() => handleEdit(item)} className="text-blue-600 text-sm">Edit</button>
                    <button onClick={() => handleDelete(item._id)} className="text-red-600 text-sm">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
            >
              ×
            </button>
            <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit Item' : 'Add New Item'}</h2>
            <div className="space-y-3">
              <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" />
              <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" className="w-full p-2 border rounded" />
              <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" />
              <select name="category" value={form.category} onChange={handleChange} className="w-full p-2 border rounded">
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <input name="image" type="file" accept="image/*" onChange={handleChange} className="w-full p-2 border rounded" />
              {previewImage && <img src={previewImage} alt="preview" className="w-32 h-32 object-cover rounded mx-auto" />}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition flex justify-center items-center"
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : null}
                {editingId ? 'Update Item' : 'Add Item'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
