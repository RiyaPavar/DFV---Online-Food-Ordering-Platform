// components/Hero.js

import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between mt-10 gap-10 px-6 md:px-20">
      {/* Text Content */}
      <div className="max-w-xl text-center lg:text-left">
        <h2 className="text-5xl md:text-6xl font-semibold leading-tight text-gray-900 mb-6">
          it’s not just <br /> Food, It’s an <br /><span className="text-black">Experience.</span>
        </h2>
        <div className="flex justify-center lg:justify-start gap-4 mb-6">
          <Link href="/menu">
            <button className="bg-red-600 text-white px-6 py-2 rounded-full font-medium hover:bg-red-700 transition">
              View Menu
            </button>
          </Link>
          <Link href="/book">
            <button className="border border-gray-400 px-6 py-2 rounded-full font-medium hover:border-red-600 hover:text-red-600 transition">
              Book A Table
            </button>
          </Link>
        </div>
        {/* Reviews */}
        <div className="flex items-center justify-center lg:justify-start gap-4 mt-4">
          <div className="flex -space-x-3">
            <Image src="https://randomuser.me/api/portraits/men/32.jpg" width={32} height={32} className="rounded-full border-2 border-white" alt="User 1" />
            <Image src="https://randomuser.me/api/portraits/women/44.jpg" width={32} height={32} className="rounded-full border-2 border-white" alt="User 2" />
            <Image src="https://randomuser.me/api/portraits/men/53.jpg" width={32} height={32} className="rounded-full border-2 border-white" alt="User 3" />
          </div>
          <div className="text-sm text-gray-600">+45 Reviews</div>
          <div className="text-yellow-500 text-lg">★★★★★</div>
        </div>
      </div>

      {/* Image */}
      <div className="relative w-full max-w-lg">
        <Image
          src="https://p7.hiclipart.com/preview/692/99/660/delicious-food.jpg"
          width={400}
          height={400}
          alt="Main Dish"
          className="rounded-full shadow-lg"
        />
        <div className="absolute top-5 left-5 bg-white px-4 py-2 text-sm rounded-xl shadow">
          <span className="text-red-600 font-bold">5%</span> off for 2 orders
        </div>
      </div>
    </section>
  );
}
