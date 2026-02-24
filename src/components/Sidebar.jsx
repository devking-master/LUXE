import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { LayoutDashboard, Package, ShoppingBag, CreditCard, Users, Settings, LogOut, X } from "lucide-react";

export default function Sidebar({ isOpen, setIsOpen }) {
  const { logout } = useAuth();

  const navItems = [
    { name: "Overview", path: "/dashboard", icon: LayoutDashboard, exact: true },
    { name: "Products", path: "/dashboard/products", icon: Package },
    { name: "Orders", path: "/dashboard/orders", icon: ShoppingBag },
    { name: "Payments", path: "/dashboard/payments", icon: CreditCard },
    { name: "Users", path: "/dashboard/users", icon: Users },
    { name: "Settings", path: "/dashboard/settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-zinc-950 text-zinc-400 flex flex-col border-r border-zinc-800 transition-transform duration-300 md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Logo / Title */}
        <div className="p-6 flex items-center justify-between">
          <div className="font-bold text-white text-xl tracking-tighter">LUXE. <span className="text-zinc-600 text-sm font-normal">Admin</span></div>
          <button
            className="md:hidden text-zinc-400 hover:text-white transition"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                  ? "bg-white text-zinc-950"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                }`
              }
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
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
    </>
  );
}
