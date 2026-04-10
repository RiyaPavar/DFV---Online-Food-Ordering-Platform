'use client';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  const team = [
    {
      name: 'Raj Singh',
      role: 'Founder & Chef',
      img: 'https://randomuser.me/api/portraits/men/32.jpg',
      bio: 'Leads the kitchen with a passion for authentic desi recipes.',
    },
    {
      name: 'Prince Yadav',
      role: 'Delivery Manager',
      img: 'https://randomuser.me/api/portraits/men/45.jpg',
      bio: 'Ensures timely and safe delivery every time.',
    },
    {
      name: 'Shivam Kumar',
      role: 'Customer Relations',
      img: 'https://randomuser.me/api/portraits/men/51.jpg',
      bio: 'Connects with customers and handles queries with a smile.',
    },
  ];

  return (
    <div className="bg-[#f9f6f3] text-gray-800">
      <Navbar />

      {/* Hero Section */}
      <section className="py-12 md:py-16 px-6 md:px-20 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
              About <span className="text-red-600">Deshi Food Villa</span>
            </h1>
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to Deshi Food Villa – your go-to destination for authentic, home-style Indian cuisine. We bring the warmth of local flavors straight to your plate, with fresh ingredients, traditional recipes, and a pinch of love in every dish.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Whether you're craving spicy street food or comforting curries, we deliver it fresh and fast within a 5 km range. We're not just a food service — we're a part of your neighborhood.
            </p>
          </div>

          {/* Image */}
          <div className="flex-1 relative h-[300px] md:h-[400px] w-full">
            <Image
              src="https://images.unsplash.com/photo-1604908811899-dad6f0f1b5b9?fit=crop&w=1400&q=80"
              alt="Deshi Food"
              fill
              className="object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 px-6 md:px-20 bg-[#fff7f4]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            Our mission is to redefine home-style food delivery by blending tradition with modern convenience. At Deshi Food Villa, we focus on hygiene, taste, and speed — delivering warm, hearty meals crafted with care and cultural pride. Every dish we prepare is an effort to bring comfort, flavor, and reliability to your dining experience.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-14 px-6 md:px-20 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-10">Meet Our Dedicated Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="bg-[#fdfdfd] rounded-xl p-6 shadow hover:shadow-md transition"
              >
                <div className="w-28 h-28 mx-auto mb-4 relative">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    className="rounded-full object-cover shadow"
                  />
                </div>
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-sm text-red-600 font-medium">{member.role}</p>
                <p className="text-xs text-gray-500 mt-2">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
