// src/pages/User/UserHome.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { ChevronUp, Loader2, ArrowRight } from "lucide-react"; 
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import useUserHome from "../../hooks/useUserHome";

import Banner1 from "../../images/Banner1.png";
import Banner2 from "../../images/Banner2.png";
import Banner3 from "../../images/Banner3.png";
import Banner4 from "../../images/Banner4.png";

const UserHome = () => {
  const { products, orders, loading, error } = useUserHome();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-zinc-900 mb-4" />
        <p className="text-zinc-500 text-sm tracking-widest uppercase">Loading Experience...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-red-50 text-red-600 px-6 py-4 rounded-lg">
           <p className="font-medium">{error}</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Hero Slider */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 rounded-2xl overflow-hidden shadow-2xl relative group"
        >
          <Swiper
            spaceBetween={0}
            centeredSlides={true}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
            }}
            pagination={{ 
               clickable: true,
               bulletClass: 'swiper-pagination-bullet !bg-white !opacity-50 !w-2 !h-2 !mx-1 transition-all !rounded-full',
               bulletActiveClass: 'swiper-pagination-bullet-active !opacity-100 !w-6'
            }}
            navigation={{
               nextEl: '.swiper-button-next',
               prevEl: '.swiper-button-prev',
            }}
            speed={1000}
            modules={[Autoplay, Pagination, Navigation]}
            className="h-[500px] w-full"
          >
            {[Banner1, Banner2, Banner3, Banner4].map((banner, index) => (
               <SwiperSlide key={index}>
                  <div className="relative w-full h-full">
                     <img src={banner} alt={`Banner ${index + 1}`} className="w-full h-full object-cover" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-12">
                        <div className="text-white transform translate-y-4 opacity-0 transition-all duration-700 delay-300 slide-content">
                           <h2 className="text-4xl font-bold mb-2">New Collection</h2>
                           <Link to="/user/shop" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest hover:text-zinc-300 transition-colors">
                              Shop Now <ArrowRight className="w-4 h-4" />
                           </Link>
                        </div>
                     </div>
                  </div>
               </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Featured Products */}
        <section className="mb-24">
          <div className="flex justify-between items-end mb-8">
             <div>
               <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">
                 Featured Products
               </h2>
               <p className="text-zinc-500 mt-2">Handpicked for your lifestyle.</p>
             </div>
             <Link to="/user/shop" className="text-zinc-900 font-medium hover:underline decoration-1 underline-offset-4 hidden sm:block">View All</Link>
          </div>

          {products.length === 0 ? (
            <div className="bg-white border border-dashed border-zinc-200 p-12 rounded-xl text-center">
              <p className="text-zinc-400">No products available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.slice(0, 8).map((p, idx) => (
                <motion.div
                  key={p._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group cursor-pointer"
                >
                  <Link to={`/user/products/${p._id}`} className="block">
                    <div className="aspect-[3/4] bg-zinc-100 rounded-xl overflow-hidden mb-4 relative shadow-sm group-hover:shadow-md transition-all duration-500">
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.name}
                          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-zinc-300">No Image</div>
                      )}
                      
                      {/* Price Tag Overlay */}
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                         ₦{p.price?.toLocaleString()}
                      </div>
                      
                      {/* Quick View Button */}
                      <div className="absolute inset-x-4 bottom-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                         <div className="bg-zinc-900 text-white text-center py-2.5 rounded-lg text-sm font-bold shadow-xl">
                            View Details
                         </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-bold text-zinc-900 line-clamp-1 group-hover:text-zinc-600 transition-colors">
                        {p.name}
                      </h3>
                      <p className="text-sm text-zinc-500 mt-1 line-clamp-1">
                         {p.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Back to Top Button */}
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-zinc-900 text-white p-3 rounded-full shadow-xl hover:bg-zinc-800 transition-all transform hover:-translate-y-1 z-50"
        >
          <ChevronUp size={20} />
        </button>
      )}
    </div>
  );
};

export default UserHome;
