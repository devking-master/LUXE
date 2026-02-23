import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { LayoutDashboard, ShoppingBag, ShoppingCart, CreditCard, Settings, LogOut } from "lucide-react";

const navLinks = [
  { to: "/staff", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/staff/products", label: "Products", icon: ShoppingBag },
  { to: "/staff/orders", label: "Orders", icon: ShoppingCart },
  { to: "/staff/payments", label: "Payments", icon: CreditCard },
  { to: "/staff/settings", label: "Settings", icon: Settings },
];

const StaffLayout = () => {
  const { logout } = useAuth();

  return (
    <div className="flex h-screen bg-zinc-50 font-sans text-zinc-900">
      {/* Sidebar */}
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-950 text-zinc-400 border-r border-zinc-800 flex flex-col fixed inset-y-0 z-50">
        <div className="p-6 flex items-center justify-between">
           <div className="font-bold text-white text-xl tracking-tighter">LUXE. <span className="text-zinc-600 text-sm font-normal">Staff</span></div>
        </div>

        <nav className="flex-1 px-4 py-4 overflow-y-auto">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
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

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto min-h-screen">
        <div className="max-w-7xl mx-auto">
           <Outlet />
        </div>
      </main>
    </div>
  );
};

export default StaffLayout;