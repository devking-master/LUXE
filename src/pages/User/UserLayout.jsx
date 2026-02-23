import React, { useState, useEffect } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import { Search, ShoppingCart, User, ChevronDown, Menu } from "lucide-react";
import { useCart } from "../../AuthContext/CartContext";
import { useAuth } from "../../hooks/useAuth";

const UserLayout = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [animate, setAnimate] = useState(false);

  const { cart } = useCart();
  const { logout, user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 500); 
      return () => clearTimeout(timer);
    }
  }, [cart]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 🔹 Announcement Bar */}
      <div className="bg-zinc-950 text-white text-xs py-2 text-center font-medium tracking-wide">
        COMPLIMENTARY SHIPPING ON ALL ORDERS OVER ₦50,000 | WORLDWIDE DELIVERY
      </div>

      {/* 🔹 Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/90 backdrop-blur-md border-b border-zinc-200" : "bg-white border-b border-zinc-100"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link
            to="/user"
            className="text-2xl font-bold tracking-tighter text-zinc-900"
          >
            LUXE.
          </Link>

          {/* Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 mx-8">
             {["Shop", "Orders", "Payments"].map((item) => (
                <NavLink
                  key={item}
                  to={item.toLowerCase()}
                  className={({ isActive }) =>
                    `text-xs uppercase tracking-widest font-semibold transition-colors hover:text-zinc-900 ${
                      isActive ? "text-zinc-900" : "text-zinc-500"
                    }`
                  }
                >
                  {item}
                </NavLink>
             ))}
          </nav>

          {/* Right side (icons/links) */}
          <div className="flex items-center space-x-6">
            <NavLink
              to="cart"
              className="relative flex items-center transition font-medium text-zinc-900 hover:text-zinc-600"
            >
              <ShoppingCart className="h-5 w-5 mr-1" />
              {cart.length > 0 && (
                <span
                  className={`absolute -top-1 -right-2 bg-zinc-950 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full transform transition-all ${
                    animate ? "scale-125" : "scale-100"
                  }`}
                >
                  {cart.length}
                </span>
              )}
            </NavLink>

            {/* Account with dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center transition font-medium text-zinc-900 hover:text-zinc-600"
              >
                <div className="h-8 w-8 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center mr-2">
                   <User className="h-4 w-4 text-zinc-900" />
                </div>
                <span className="hidden sm:block text-sm font-medium">{user?.firstname || 'Account'}</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-zinc-200 shadow-xl rounded-lg py-1 z-50 ring-1 ring-black ring-opacity-5 animate-in fade-in zoom-in-95 duration-200">
                  <NavLink
                    to="/user/settings"
                    className="block px-4 py-2 text-zinc-700 hover:bg-zinc-50 text-sm"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    My Account
                  </NavLink>
                  <NavLink
                    to="/user/orders"
                    className="block px-4 py-2 text-zinc-700 hover:bg-zinc-50 text-sm"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Orders
                  </NavLink>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 text-sm border-t border-zinc-100 mt-1"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
 
      {/* 🔹 Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8">
        <Outlet />
      </main>

      {/* 🔹 Footer */}
      <footer className="bg-zinc-950 text-white border-t border-zinc-900 py-16">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              <div className="md:col-span-2">
                 <h2 className="text-2xl font-bold tracking-tighter mb-4">LUXE.</h2>
                 <p className="text-zinc-400 max-w-sm">Redefining modern e-commerce with timeless style and premium quality.</p>
              </div>
              <div>
                 <h3 className="font-bold mb-4">Shop</h3>
                 <ul className="space-y-2 text-zinc-400 text-sm">
                    <li><a href="#" className="hover:text-white transition">New Arrivals</a></li>
                    <li><a href="#" className="hover:text-white transition">Best Sellers</a></li>
                    <li><a href="#" className="hover:text-white transition">Accessories</a></li>
                 </ul>
              </div>
              <div>
                 <h3 className="font-bold mb-4">Support</h3>
                 <ul className="space-y-2 text-zinc-400 text-sm">
                    <li><a href="#" className="hover:text-white transition">FAQ</a></li>
                    <li><a href="#" className="hover:text-white transition">Shipping</a></li>
                    <li><a href="#" className="hover:text-white transition">Returns</a></li>
                 </ul>
              </div>
           </div>
           <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-zinc-500">
             <p>© {new Date().getFullYear()} Luxe Inc. All Rights Reserved.</p>
             <div className="flex gap-4 mt-4 md:mt-0">
                <a href="#" className="hover:text-white">Privacy</a>
                <a href="#" className="hover:text-white">Terms</a>
             </div>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default UserLayout;
