import FoodCard from "./FoodCard";
import { foodItems } from "@/data/foodItems";

export default function FoodSection() {
  return (
    <section className="px-6 md:px-20 mb-12">
      {/* Heading */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Recommended For You
        </h2>
        {/* Optional "View All" button */}
        <button className="text-red-600 hover:underline text-sm">View All</button>
      </div>

      {/* Food Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {foodItems.map((item, index) => (
          <FoodCard key={index} {...item} />
        ))}
      </div>
    </section>
  );
}
