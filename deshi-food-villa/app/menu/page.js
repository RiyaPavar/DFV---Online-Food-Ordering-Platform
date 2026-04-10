'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import MenuFoodCard from '@/components/MenuFoodCard';
import Navbar from '@/components/Navbar';
import StickyCheckoutBar from '@/components/StickyCheckoutBar';
import api from '@/lib/api';

const MenuPage = () => {
  const searchParams = useSearchParams();
  const categoryFromURL = searchParams.get('category') || 'All';

  const [selectedCategory, setSelectedCategory] = useState(categoryFromURL);
  const [selectedMainCategory, setSelectedMainCategory] = useState('All');
  const [items, setItems] = useState([]);
  const [subcategories, setSubcategories] = useState(['All']);
  const mainCategories = ['All', 'Starter', 'Main Course', 'Drinks', 'Dessert'];

  useEffect(() => {
    setSelectedCategory(categoryFromURL);
  }, [categoryFromURL]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await api.get('/items');
        const data = res.data || [];
        setItems(data);

        const allSubcategories = Array.from(
          new Set(data.map(item => item.subcategory).filter(Boolean))
        );
        setSubcategories(['All', ...allSubcategories]);
      } catch (err) {
        console.error('Failed to fetch items:', err);
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    if (selectedMainCategory === 'All') {
      const allSubcategories = Array.from(
        new Set(items.map(item => item.subcategory).filter(Boolean))
      );
      setSubcategories(['All', ...allSubcategories]);
    } else {
      const filteredSubs = Array.from(
        new Set(
          items
            .filter(item => item.category === selectedMainCategory)
            .map(item => item.subcategory)
            .filter(Boolean)
        )
      );
      setSubcategories(['All', ...filteredSubs]);
    }
    setSelectedCategory('All');
  }, [selectedMainCategory, items]);

  const filteredItems = items.filter((item) => {
    const matchSub = selectedCategory === 'All' || item.subcategory === selectedCategory;
    const matchMain = selectedMainCategory === 'All' || item.category === selectedMainCategory;
    return matchSub && matchMain;
  });

  // Sort available items first, then unavailable ones
  const sortedItems = filteredItems.sort((a, b) => {
    return (a.availability === false) - (b.availability === false);
  });

  return (
    <>
      <Navbar />
      <div className="px-4 md:px-10 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Our Menu</h1>

        {/* Filter Row */}
        <div className="mb-8 flex flex-wrap justify-between items-center gap-4">
          <div className="flex overflow-x-auto gap-3 hide-scrollbar max-w-full">
            {subcategories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-full border ${
                  selectedCategory === cat ? 'bg-black text-white' : 'bg-white'
                }`}
              >
                {cat || 'Uncategorized'}
              </button>
            ))}
          </div>

          {/* Main Category Dropdown */}
          <select
            value={selectedMainCategory}
            onChange={(e) => setSelectedMainCategory(e.target.value)}
            className="px-4 py-2 rounded-full border bg-white"
          >
            {mainCategories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Food Grid */}
        <div className="flex flex-col gap-4">
          {sortedItems.length > 0 ? (
            sortedItems.map((item) => <MenuFoodCard key={item._id} item={item} />)
          ) : (
            <p className="text-center text-gray-500">No items found.</p>
          )}
        </div>
      </div>
      <StickyCheckoutBar />
    </>
  );
};

export default MenuPage;
