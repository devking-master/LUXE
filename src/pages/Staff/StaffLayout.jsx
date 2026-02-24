import React, { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { LayoutDashboard, ShoppingBag, ShoppingCart, CreditCard, Settings, LogOut, Menu, X } from "lucide-react";

const navLinks = [
  { to: "/staff", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/staff/products", label: "Products", icon: ShoppingBag },
  { to: "/staff/orders", label: "Orders", icon: ShoppingCart },
  { to: "/staff/payments", label: "Payments", icon: CreditCard },
  { to: "/staff/settings", label: "Settings", icon: Settings },
];

const StaffLayout = () => {
  const { logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const getPageTitle = (pathname) => {
    if (pathname === '/staff') return 'Dashboard';
    const pathParts = pathname.split('/');
    const lastPart = pathParts[pathParts.length - 1];
    if (lastPart === 'staff') return 'Dashboard';
    if (pathParts.length > 3) {
      return pathParts[2].charAt(0).toUpperCase() + pathParts[2].slice(1);
    }
    return lastPart.charAt(0).toUpperCase() + lastPart.slice(1);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-zinc-50 font-sans text-zinc-900 overflow-hidden">

      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-zinc-950 text-zinc-400 border-r border-zinc-800 flex flex-col transition-transform duration-300 md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex items-center justify-between">
          <div className="font-bold text-white text-xl tracking-tighter">LUXE. <span className="text-zinc-600 text-sm font-normal">Staff</span></div>
          <button
            className="md:hidden text-zinc-400 hover:text-white transition"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 overflow-y-auto">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                      ? "bg-white text-zinc-950"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                    }`
                  }
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-zinc-900">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-zinc-900 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex flex-col flex-1 overflow-hidden h-full">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-zinc-200 flex items-center justify-between px-4 py-4 z-10 shrink-0">
          <div className="flex items-center gap-3">
            <button
              className="p-2 -ml-2 text-zinc-500 hover:text-zinc-900 rounded-lg hover:bg-zinc-100 transition"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-zinc-900 tracking-tight">
              {getPageTitle(location.pathname)}
            </h1>
          </div>
          <div className="h-8 w-8 rounded-full bg-zinc-900 text-white flex items-center justify-center text-xs font-bold">
            ST
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto h-full">
            <Outlet />
          </div>
        </main>
      </div>

    </div>
  );
};

export default StaffLayout;