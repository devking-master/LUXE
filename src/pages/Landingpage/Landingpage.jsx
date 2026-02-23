// src/pages/Landingpage/Landingpage.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, ArrowRight, Star, Shield, Truck, Clock } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { privateApiClient } from "../../lib/client.js";

import Banner1 from "../../images/Banner1.png";
import Banner2 from "../../images/Banner2.png";
import Banner3 from "../../images/Banner3.png";
import Banner4 from "../../images/Banner4.png";

const heroSlides = [
  {
    image: Banner1,
    title: "ELEVATE YOUR STYLE",
    subtitle: "Timeless pieces for the modern era.",
    cta: "Shop Collection"
  },
  {
    image: Banner2,
    title: "SUMMER ESSENTIALS",
    subtitle: "Discover the new season favorites.",
    cta: "Explore Now"
  },
  {
    image: Banner3,
    title: "PREMIUM COMFORT",
    subtitle: "Luxury fabrics meeting everyday wear.",
    cta: "View Catalog"
  },
  {
    image: Banner4,
    title: "SIGNATURE LOOKS",
    subtitle: "Define your presence with our exclusives.",
    cta: "Shop Now"
  }
];

const LandingPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await privateApiClient.get("/products");
        const data = Array.isArray(res.data) ? res.data : res.data.products || [];
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-white text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white">
      
      {/* Hero Slider */}
      <section className="relative h-[85vh] w-full overflow-hidden bg-zinc-951">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          className="h-full w-full"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4">
                  <div className="max-w-4xl mx-auto space-y-6">
                    <motion.h1 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter"
                    >
                      {slide.title}
                    </motion.h1>
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.8 }}
                      className="text-lg md:text-2xl text-zinc-200 font-light"
                    >
                      {slide.subtitle}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.8 }}
                    >
                      <Link 
                        to="/user/shop" 
                        className="inline-flex items-center gap-2 bg-white text-zinc-950 px-8 py-4 rounded-full font-bold text-sm tracking-wide hover:bg-zinc-100 transition-all transform hover:scale-105 shadow-xl"
                      >
                        {slide.cta} <ArrowRight className="w-4 h-4" />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Featured Collection */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
           <div>
              <span className="text-zinc-500 font-medium tracking-wider text-sm uppercase">Curated For You</span>
              <h2 className="text-4xl font-bold tracking-tight mt-2 text-zinc-900">Featured Originals.</h2>
           </div>
           <Link to="/user/shop" className="group flex items-center gap-2 text-sm font-semibold border-b border-zinc-900 pb-1 hover:text-zinc-600 hover:border-zinc-600 transition-all">
              View All Products <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
           </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="animate-pulse space-y-4">
                <div className="bg-zinc-100 aspect-[3/4] rounded-xl"></div>
                <div className="h-4 bg-zinc-100 rounded w-2/3"></div>
                <div className="h-4 bg-zinc-100 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {products.slice(0, 4).map((p, idx) => (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }} 
                onClick={() => navigate(`/user/products/${p._id}`)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-zinc-100 mb-6 group-hover:shadow-lg transition-all duration-500">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.title}
                      className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-zinc-300 font-medium">No Image</div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                  
                  {/* Tag */}
                  {p.price > 10000 && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                      Premium
                    </div>
                  )}
                </div>
                
                <h3 className="text-lg font-bold text-zinc-900 leading-snug group-hover:text-zinc-600 transition-colors">{p.title}</h3>
                <div className="flex justify-between items-center mt-2">
                   <p className="text-zinc-500 font-medium">₦{p.price?.toLocaleString()}</p>
                   {/* <div className="flex items-center gap-1 text-amber-400 text-xs">
                      <Star className="w-3 h-3 fill-current" /> 4.9
                   </div> */}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Modern Grid / Categories Preview - Dark Mode Mix */}
      <section className="py-24 bg-zinc-950 text-white">
         <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
               <div>
                  <h2 className="text-4xl font-bold tracking-tight mb-2">Explore Collections</h2>
                  <p className="text-zinc-400">Find your unique style among our categories.</p>
               </div>
               <Link to="/user/shop" className="text-white border-b border-white pb-1 hover:text-zinc-300 hover:border-zinc-300 transition-colors">
                  View Full Catalog
               </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[600px]">
               <div className="relative rounded-2xl overflow-hidden group cursor-pointer" onClick={() => navigate('/user/shop?category=men')}>
                  <img src="https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1974&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" alt="Men" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-10">
                     <div className="text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-3xl font-bold mb-2">Men's Collection</h3>
                        <p className="text-zinc-300 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">Refined aesthetics for the modern gentleman.</p>
                        <span className="inline-flex items-center gap-2 text-sm font-semibold border-b border-white/30 pb-1">Shop Now <ArrowRight className="w-4 h-4"/></span>
                     </div>
                  </div>
               </div>
               <div className="grid grid-rows-2 gap-6">
                  <div className="relative rounded-2xl overflow-hidden group cursor-pointer" onClick={() => navigate('/user/shop?category=women')}>
                     <img src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" alt="Women" />
                     <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                        <h3 className="text-white text-3xl font-bold tracking-tight transform group-hover:scale-110 transition-transform">Women</h3>
                     </div>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden group cursor-pointer" onClick={() => navigate('/user/shop?category=accessories')}>
                     <img src="https://images.unsplash.com/photo-1590736990333-bd4327be864d?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" alt="Accessories" />
                     <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                        <h3 className="text-white text-3xl font-bold tracking-tight transform group-hover:scale-110 transition-transform">Accessories</h3>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Features / Values - White Background to Contrast */}
      <section className="py-24 max-w-7xl mx-auto px-6 bg-white">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-zinc-100">
            <div className="px-6 py-4 group">
               <div className="w-16 h-16 bg-zinc-950 text-white rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-7 h-7" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-zinc-900">Secure Payments</h3>
               <p className="text-zinc-500 leading-relaxed">All transactions are encrypted and secured with industry standards.</p>
            </div>
            <div className="px-6 py-4 group">
               <div className="w-16 h-16 bg-zinc-950 text-white rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Truck className="w-7 h-7" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-zinc-900">Express Delivery</h3>
               <p className="text-zinc-500 leading-relaxed">Fast shipping options available globally with real-time tracking.</p>
            </div>
            <div className="px-6 py-4 group">
               <div className="w-16 h-16 bg-zinc-950 text-white rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-7 h-7" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-zinc-900">24/7 Support</h3>
               <p className="text-zinc-500 leading-relaxed">Our dedicated support team is available anytime to assist you.</p>
            </div>
         </div>
      </section>

      {/* Newsletter - Black Background Again */}
      <section className="bg-zinc-950 text-white py-24 overflow-hidden relative border-t border-zinc-900">
         <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
         <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Join the Inner Circle.</h2>
            <p className="text-zinc-400 mb-10 text-lg">Subscribe to receive exclusive offers, early access to drops, and style tips.</p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
               <input 
                 type="email" 
                 placeholder="Enter your email address" 
                 className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/50 transition backdrop-blur-sm"
               />
               <button className="bg-white text-zinc-950 px-8 py-4 rounded-full font-bold hover:bg-zinc-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                  Subscribe
               </button>
            </form>
         </div>
      </section>
    </div>
  );
};

export default LandingPage;
