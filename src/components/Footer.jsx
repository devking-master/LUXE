import React from "react";

const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-zinc-400 py-12 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
           <div className="text-2xl font-bold text-white mb-4 tracking-tighter">LUXE.</div>
           <p className="text-sm leading-relaxed">Defining modern elegance with curated collections for the discerning individual.</p>
        </div>
        <div>
           <h4 className="text-white font-semibold mb-4">Shop</h4>
           <ul className="space-y-2 text-sm">
             <li><a href="#" className="hover:text-white transition">New Arrivals</a></li>
             <li><a href="#" className="hover:text-white transition">Best Sellers</a></li>
             <li><a href="#" className="hover:text-white transition">Accessories</a></li>
           </ul>
        </div>
        <div>
           <h4 className="text-white font-semibold mb-4">Company</h4>
           <ul className="space-y-2 text-sm">
             <li><a href="#" className="hover:text-white transition">About Us</a></li>
             <li><a href="#" className="hover:text-white transition">Careers</a></li>
             <li><a href="#" className="hover:text-white transition">Press</a></li>
           </ul>
        </div>
        <div>
           <h4 className="text-white font-semibold mb-4">Legal</h4>
           <ul className="space-y-2 text-sm">
             <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
             <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
           </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center text-sm">
        <p>© {new Date().getFullYear()} Luxe Inc. All rights reserved.</p>
        <p>Built with precision.</p>
      </div>
    </footer>
  );
};

export default Footer;
