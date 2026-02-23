import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import logo from "../images/Main-Logo.png"; // Assuming these exist, verify later or replace with text if broken
import logo2 from "../images/Main-Logo2.png";
import { Search, ShoppingBag, User } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-zinc-200 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
        {/* Logo area */}
        <Link to="/" className="flex items-center gap-2 group">
           {/* Fallback to text if image fails or for cleaner look */}
           <div className={`text-2xl font-bold tracking-tighter ${scrolled ? 'text-zinc-950' : 'text-white'} transition-colors`}>
              LUXE.
           </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {["Home", "Shop", "About Us", "Services"].map((item) => { 
             const path = item === "Home" ? "/" : item === "Shop" ? "/auth/register" : `/${item.toLowerCase().replace(" ", "-")}`;
             return (
              <Link
                key={item}
                to={path}
                className={`text-sm font-medium transition-colors hover:text-zinc-400 ${
                  scrolled ? "text-zinc-900" : "text-white" 
                }`}
              >
                {item}
              </Link>
            )
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className={`p-2 rounded-full transition-colors ${scrolled ? 'hover:bg-zinc-100 text-zinc-900' : 'hover:bg-white/20 text-white'}`}>
            <Search className="w-5 h-5" />
          </button>

          {!user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/auth/login"
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                    scrolled 
                    ? "text-zinc-900 hover:bg-zinc-100" 
                    : "text-white hover:bg-white/10"
                }`}
              >
                Log in
              </Link>
              <Link
                to="/auth/register"
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all shadow-lg ${
                  scrolled
                    ? "bg-zinc-950 text-white hover:bg-zinc-800 shadow-zinc-900/20"
                    : "bg-white text-zinc-950 hover:bg-zinc-100 shadow-white/20"
                }`}
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              {user.role === "user" && (
                 <Link to="/user/cart" className={`p-2 rounded-full transition-colors ${scrolled ? 'hover:bg-zinc-100 text-zinc-900' : 'hover:bg-white/20 text-white'}`}>
                    <ShoppingBag className="w-5 h-5" />
                 </Link>
              )}
              
              <Link
                 to={user.role === "admin" ? "/dashboard" : user.role === "staff" ? "/staff" : "/user/profile"}
                 className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors ${
                   scrolled
                     ? "bg-zinc-100 hover:bg-zinc-200"
                     : "bg-white/20 backdrop-blur hover:bg-white/30"
                 }`}
              >
                 <User className={`w-4 h-4 ${scrolled ? 'text-zinc-700' : 'text-white'}`} />
                 <span className={`text-sm font-medium max-w-[100px] truncate ${scrolled ? 'text-zinc-900' : 'text-white'}`}>{user.firstname || 'Account'}</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

