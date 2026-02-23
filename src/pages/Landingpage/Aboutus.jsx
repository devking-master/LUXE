import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900">
      
      {/* Hero */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-zinc-900">
         <div className="absolute inset-0">
             <img 
               src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1974&auto=format&fit=crop"
               className="w-full h-full object-cover opacity-50"
               alt="About Studio"
             />
         </div>
         <div className="relative z-10 text-center text-white px-6 max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">Our Story.</h1>
            <p className="text-xl text-zinc-200 font-light">Redefining modern retail with purpose and precision.</p>
         </div>
      </div>

      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="prose prose-lg prose-zinc mx-auto">
           <h2 className="text-3xl font-bold tracking-tight text-center mb-10">Crafting the Future of Fashion</h2>
           <p className="text-zinc-600 leading-relaxed mb-8">
              Founded with a vision to make luxury accessible, we bridge the gap between high-end aesthetics and everyday functionality. What started as a small curated collection has grown into a global destination for style-conscious individuals.
           </p>
           <p className="text-zinc-600 leading-relaxed mb-8">
              We believe in quality over quantity. Every piece in our store is hand-selected, tested, and verified to meet our rigorous standards. We don't just sell products; we sell confidence, style, and a lifestyle of excellence.
           </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 text-center">
           <div>
              <p className="text-4xl font-bold text-zinc-900 mb-2">10k+</p>
              <p className="text-zinc-500 text-sm uppercase tracking-wide">Happy Customers</p>
           </div>
           <div>
              <p className="text-4xl font-bold text-zinc-900 mb-2">50+</p>
              <p className="text-zinc-500 text-sm uppercase tracking-wide">Brands</p>
           </div>
           <div>
              <p className="text-4xl font-bold text-zinc-900 mb-2">100%</p>
              <p className="text-zinc-500 text-sm uppercase tracking-wide">Authentic</p>
           </div>
           <div>
              <p className="text-4xl font-bold text-zinc-900 mb-2">24/7</p>
              <p className="text-zinc-500 text-sm uppercase tracking-wide">Support</p>
           </div>
        </div>
      </section>

      <section className="bg-zinc-50 py-24">
         <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center">Meet the Creators</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white p-6 rounded-xl border border-zinc-100 text-center">
                     <div className="w-24 h-24 bg-zinc-200 rounded-full mx-auto mb-4 overflow-hidden">
                        <img 
                          src={`https://i.pravatar.cc/150?img=${i + 10}`} 
                          alt="Team Member" 
                          className="w-full h-full object-cover"
                        />
                     </div>
                     <h3 className="font-bold text-lg">Alex Doe</h3>
                     <p className="text-zinc-500 text-sm mb-4">Co-Founder</p>
                     <p className="text-zinc-400 text-sm">"Design is not just what it looks like and feels like. Design is how it works."</p>
                  </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
}
