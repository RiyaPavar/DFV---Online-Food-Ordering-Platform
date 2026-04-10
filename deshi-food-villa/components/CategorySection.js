'use client';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { categories } from '@/data/Categories';
import Link from 'next/link';

const CategorySection = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const scrollWidth = el.scrollWidth;
    const clientWidth = el.clientWidth;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    window.addEventListener('resize', checkScroll);
    el.addEventListener('scroll', checkScroll);
    return () => {
      window.removeEventListener('resize', checkScroll);
      el.removeEventListener('scroll', checkScroll);
    };
  }, []);

  const scroll = (dir) => {
    const el = scrollRef.current;
    const scrollAmount = 400;
    if (el) {
      el.scrollBy({
        left: dir === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Explore Categories</h2>
        </div>

        <div className="flex justify-end mb-4 gap-4 px-4">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`p-2 rounded-full bg-white border shadow-md ${
              canScrollLeft ? 'text-gray-800' : 'text-gray-300 cursor-not-allowed'
            }`}
          >
            <ArrowLeft size={18} />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`p-2 rounded-full bg-white border shadow-md ${
              canScrollRight ? 'text-gray-800' : 'text-gray-300 cursor-not-allowed'
            }`}
          >
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="relative">
          <div ref={scrollRef} className="overflow-x-auto no-scrollbar">
            <div className="grid grid-rows-2 gap-y-6 sm:gap-y-8 gap-x-4 sm:gap-x-6 md:gap-x-10 auto-cols-max grid-flow-col w-max mx-auto px-4">
              {categories.map((cat) => {
                // If mainCategory is not present in the data, manually map it here:
                const mainCategory = cat.mainCategory || 'All'; // e.g., 'Starter', 'Main Course'
                return (
                  <Link key = {cat.name} href={`/explore/${encodeURIComponent(cat.name)}`}>
                    <div className="flex flex-col items-center text-center w-24 sm:w-28 px-1 sm:px-2 cursor-pointer">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden border shadow-md">
                        <Image
                          src={cat.img}
                          alt={cat.name}
                          width={96}
                          height={96}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <span className="mt-2 text-xs sm:text-sm font-medium text-gray-700">
                        {cat.name}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default CategorySection;
