import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { LayoutDashboard, Package, ShoppingBag, CreditCard, Users, Settings, LogOut } from "lucide-react";

export default function Sidebar() {
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
    <aside className="w-64 bg-zinc-950 text-zinc-400 flex flex-col border-r border-zinc-800">
      {/* Logo / Title */}
      <div className="p-6 flex items-center justify-between">
         <div className="font-bold text-white text-xl tracking-tighter">LUXE. <span className="text-zinc-600 text-sm font-normal">Admin</span></div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.exact}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive 
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
  );
}
