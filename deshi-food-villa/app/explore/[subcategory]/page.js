'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import StickyCheckoutBar from '@/components/StickyCheckoutBar';
import MenuFoodCard from '@/components/MenuFoodCard';
import api from '@/lib/api';

export default function ExploreBySubcategoryPage() {
  const params = useParams();
  const router = useRouter();
  const subcategory = decodeURIComponent(params?.subcategory || '');

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await api.get('/items');
        const allItems = res.data || [];

        const filtered = allItems.filter(
          (item) => item.subcategory?.toLowerCase() === subcategory?.toLowerCase()
        );

        setItems(filtered);
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    };

    if (subcategory) fetchItems();
  }, [subcategory]);

  return (
    <>
      <Navbar />
      <div className="px-4 md:px-10 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold capitalize">{subcategory} Items</h1>
          <button
            onClick={() => router.push('/menu')}
            className="text-sm text-blue-600 hover:underline"
          >
            ← Explore More
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : items.length > 0 ? (
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <MenuFoodCard key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No items found in this category.</p>
        )}
      </div>
      <StickyCheckoutBar />
    </>
  );
}
