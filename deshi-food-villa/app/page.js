// app/page.js

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FoodSection from "@/components/FoodSection";
import Footer from "@/components/Footer";
import CategorySection from "@/components/CategorySection";
import StickyCheckoutBar from "@/components/StickyCheckoutBar";
export default function Home() {
  return (
    <div className="bg-[#f9f6f3] min-h-screen font-sans">
      <Navbar />
      <Hero />
      <CategorySection />
      <FoodSection />
      <Footer/>
      <StickyCheckoutBar/>
    </div>
  );
}
