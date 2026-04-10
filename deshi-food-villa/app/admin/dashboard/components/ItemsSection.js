'use client';
import { useState, useEffect, useCallback } from 'react';
import api from '@/lib/api';
import toast from 'react-hot-toast'

export default function AdminItemsPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    subcategory: '',
    image: null,
    availability: true,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubcategory, setSelectedSubcategory] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Starter', 'Main Course', 'Dessert', 'Drinks'];
  const allSubcategories = [
    'All', 'Pizza', 'Burger', 'North Indian', 'Chinese', 
    'Biryani', 'Rolls', 'Dosa', 'Chole Bhature', 'Kebab',
    'Ice Cream', 'Cake', 'Paratha', 'Pure Veg'
  ];

  useEffect(() => { 
    fetchItems(); 
  }, []);

  const fetchItems = useCallback(async () => {
    setIsFetching(true);
    try {
      const res = await api.get('/items');
      setItems(res.data);
    } catch (err) {
      toast.error('Failed to fetch items');
      console.error(err);
    } finally {
      setIsFetching(false);
    }
  }, []);

  const getAvailableSubcategories = useCallback(() => {
    if (selectedCategory === 'All') return allSubcategories;
    const itemsInCategory = items.filter(item => item.category === selectedCategory);
    const uniqueSubcats = [...new Set(itemsInCategory.map(item => item.subcategory))];
    return ['All', ...uniqueSubcats.filter(subcat => subcat && allSubcategories.includes(subcat))];
  }, [selectedCategory, items]);

  const getFilteredItems = useCallback(() => {
    let filtered = [...items];
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    if (selectedSubcategory !== 'All') {
      filtered = filtered.filter(item => item.subcategory === selectedSubcategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [items, selectedCategory, selectedSubcategory, searchQuery]);

  const openModal = () => {
    setForm({
      name: '',
      price: '',
      description: '',
      category: '',
      subcategory: '',
      image: null,
      availability: true,
    });
    setEditingId(null);
    setPreviewImage(null);
    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (name === 'image') {
      const file = files[0];
      setForm((prev) => ({ ...prev, image: file }));
      setPreviewImage(file ? URL.createObjectURL(file) : null);
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async () => {
    if (!form.name || !form.price || !form.category || !form.subcategory || !form.description) {
      toast.error('Please fill all required fields');
      
      return;
    }

    setLoading(true);
    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (key === 'image' && val) {
        formData.append('image', val);
      } else if (key !== 'image') {
        formData.append(key, val.toString());
      }
    });

    try {
      const endpoint = editingId ? `/items/${editingId}` : '/items/add';
      const method = editingId ? api.put : api.post;
      await method(endpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      toast.success(`Item ${editingId ? 'updated' : 'added'} successfully`);
      fetchItems();
      setModalOpen(false);
    } catch (err) {
      toast.error(err.response?.data?.error || `Failed to ${editingId ? 'update' : 'add'} item`);
      console.error(err);
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
      subcategory: item.subcategory,
      image: null,
      availability: item.availability,
    });
    setPreviewImage(item.img);
    setEditingId(item._id);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await api.delete(`/items/${id}`);
        toast.success('Item deleted successfully');
        fetchItems();
      } catch (err) {
        toast.error('Failed to delete item');
        console.error(err);
      }
    }
  };

  const toggleAvailability = async (id, currentStatus) => {
    try {
      const res = await api.patch(`/items/update-availability/${id}`, {
        availability: !currentStatus,
      });
      if (res.data?.item) {
        setItems((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, availability: !currentStatus } : item
          )
        );
        toast.success(`Item marked as ${!currentStatus ? 'available' : 'unavailable'}`);
      }
    } catch (err) {
      toast.error('Availability update failed');
      console.error(err);
    }
  };

  const filteredItems = getFilteredItems();

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Food Items Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} found
          </p>
        </div>
        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
          <button
            onClick={openModal}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition whitespace-nowrap"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Item
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Filters */}
      <div className="lg:hidden grid grid-cols-2 gap-3 mb-4">
        <div>
          <label htmlFor="mobile-category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            id="mobile-category"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedSubcategory('All');
            }}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="mobile-subcategory" className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
          <select
            id="mobile-subcategory"
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
          >
            {getAvailableSubcategories().map((subcat) => (
              <option key={subcat} value={subcat}>{subcat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Desktop Filters - Hidden on mobile */}
        <div className="hidden lg:block lg:w-1/4">
          <div className="bg-white rounded-xl shadow-sm p-4 sticky top-6 space-y-4">
            <div>
              <h2 className="text-lg font-semibold mb-2 text-gray-800">Categories</h2>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setSelectedSubcategory('All');
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg transition ${
                      selectedCategory === cat
                        ? 'bg-red-50 text-red-600 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold mb-2 text-gray-800">Subcategories</h2>
              <div className="space-y-1">
                {getAvailableSubcategories().map((subcat) => (
                  <button
                    key={subcat}
                    onClick={() => setSelectedSubcategory(subcat)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition ${
                      selectedSubcategory === subcat
                        ? 'bg-red-50 text-red-600 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {subcat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Items List */}
        <div className="lg:flex-1">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {selectedCategory === 'All' ? 'All Items' : selectedCategory + ' Items'}
                {selectedSubcategory !== 'All' ? ` (${selectedSubcategory})` : ''}
              </h2>
              {isFetching && (
                <span className="text-sm text-gray-500">Loading...</span>
              )}
            </div>
            
            {filteredItems.length > 0 ? (
              <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                {filteredItems.map((item) => (
                  <div key={item._id} className="border rounded-lg overflow-hidden hover:shadow-md transition">
                    <div className="flex">
                      {item.img && (
                        <img 
                          src={item.img} 
                          alt={item.name} 
                          className="w-24 h-24 object-cover"
                          loading="lazy"
                        />
                      )}
                      <div className="p-3 flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-bold">{item.name}</h3>
                          <span className="font-bold text-red-600">₹{item.price}</span>
                        </div>
                        <div className="flex gap-2 mt-1">
                          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                            {item.category}
                          </span>
                          {item.subcategory && (
                            <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                              {item.subcategory}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2 mt-2">{item.description}</p>
                        <div className="mt-3 flex items-center justify-between">
                          <button
                            onClick={() => toggleAvailability(item._id, item.availability)}
                            className={`px-2 py-1 text-xs rounded-full ${
                              item.availability 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {item.availability ? 'Available' : 'Unavailable'}
                          </button>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleEdit(item)}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => handleDelete(item._id)}
                              className="text-red-600 hover:text-red-800 text-sm font-medium"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No items found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchQuery 
                    ? 'No items match your search query'
                    : selectedCategory === 'All' 
                      ? 'No items match your filters' 
                      : `No ${selectedCategory} items${selectedSubcategory !== 'All' ? ` in ${selectedSubcategory}` : ''}`}
                </p>
                {!searchQuery && (
                  <button
                    onClick={openModal}
                    className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Add New Item
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit Item Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingId ? 'Edit Item' : 'Add New Item'}
                </h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">₹</span>
                    <input
                      type="number"
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className="w-full pl-8 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={3}
                    required

                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.filter(cat => cat !== 'All').map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory *</label>
                    <select
                      name="subcategory"
                      value={form.subcategory}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                      required
                    >
                      <option value="">Select Subcategory</option>
                      {allSubcategories.filter(sub => sub !== 'All').map((sub) => (
                        <option key={sub} value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                  />
                  {previewImage && (
                    <div className="mt-2">
                      <img 
                        src={previewImage} 
                        alt="Preview" 
                        className="h-32 w-full object-contain rounded border border-gray-200"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/placeholder-food.jpg';
                        }}
                      />
                    </div>
                  )}
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="availability"
                    checked={form.availability}
                    onChange={handleChange}
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">Available</label>
                </div>
              </div>
              
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setModalOpen(false)}
                  disabled={loading}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {editingId ? 'Updating...' : 'Adding...'}
                    </>
                  ) : editingId ? 'Update Item' : 'Add Item'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}