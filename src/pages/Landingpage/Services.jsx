import { Truck, ShieldCheck, HeartHandshake, Headphones, Package, RefreshCw } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const ServiceCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white border border-zinc-100 rounded-2xl p-8 hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-300 group">
    <div className="w-12 h-12 bg-zinc-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
      <Icon className="w-6 h-6 text-zinc-900" />
    </div>
    <h3 className="text-xl font-bold text-zinc-900 mb-3">{title}</h3>
    <p className="text-zinc-500 leading-relaxed text-sm">
      {description}
    </p>
  </div>
);

export default function Services() {
  const services = [
    { icon: Truck, title: "Global Shipping", description: "Express delivery to over 100 countries with real-time tracking." },
    { icon: ShieldCheck, title: "Secure Payments", description: "Your data is protected with 256-bit SSL encryption." },
    { icon: HeartHandshake, title: "Satisfaction Guarantee", description: "Easy returns within 30 days if you are not 100% happy." },
    { icon: Headphones, title: "24/7 Concierge", description: "Dedicated support team available round the clock." },
    { icon: Package, title: "Premium Packaging", description: "Every order is beautifully wrapped in sustainable materials." },
    { icon: RefreshCw, title: "Easy Exchanges", description: "Hassle-free size exchanges to ensure the perfect fit." },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <section className="relative py-24 bg-zinc-950 text-white overflow-hidden">
         <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
         <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">World-Class Service</h1>
            <p className="text-xl text-zinc-400 leading-relaxed">
               We believe luxury extends beyond the product. Experience a seamless shopping journey designed around you.
            </p>
         </div>
      </section>

      <section className="flex-1 max-w-7xl mx-auto px-6 py-20 -mt-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <ServiceCard key={idx} {...service} />
          ))}
        </div>
      </section>
      
      <section className="bg-zinc-50 border-t border-zinc-200 py-24 text-center">
         <div className="max-w-2xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-4 text-zinc-900">Have a special request?</h2>
            <p className="text-zinc-500 mb-8">Our team is ready to assist with custom orders or styling advice.</p>
            <button className="bg-zinc-950 text-white px-8 py-4 rounded-full font-bold hover:bg-zinc-800 transition-all shadow-lg hover:shadow-zinc-900/20">
               Contact Support
            </button>
         </div>
      </section>
    </div>
  );
}
