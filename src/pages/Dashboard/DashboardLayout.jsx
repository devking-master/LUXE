import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { Menu } from "lucide-react";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const getPageTitle = (pathname) => {
    if (pathname === '/dashboard') return 'Overview';
    const pathParts = pathname.split('/');
    const lastPart = pathParts[pathParts.length - 1];
    if (lastPart === 'dashboard') return 'Overview';
    // Handle details pages e.g. /dashboard/products/123 -> Products
    if (pathParts.length > 3) {
      return pathParts[2].charAt(0).toUpperCase() + pathParts[2].slice(1);
    }
    return lastPart.charAt(0).toUpperCase() + lastPart.slice(1);
  };

  // Close sidebar on resize if window becomes large
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
    <div className="flex h-screen bg-zinc-50 overflow-hidden">
      {/* Sidebar - Controlled by state for mobile */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden h-full">
        {/* Topbar */}
        <header className="bg-white border-b border-zinc-200 flex items-center justify-between px-4 md:px-8 py-4 z-10 shrink-0">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 -ml-2 text-zinc-500 hover:text-zinc-900 rounded-lg hover:bg-zinc-100 transition"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-zinc-900 tracking-tight">
              {getPageTitle(location.pathname)}
            </h1>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <button
              className="p-2 text-zinc-500 hover:text-zinc-900 rounded-full hover:bg-zinc-100 transition hidden sm:block"
              title="Notifications"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
            </button>
            <div className="flex items-center gap-3 sm:pl-6 sm:border-l border-zinc-200">
              <div className="h-8 w-8 rounded-full bg-zinc-900 text-white flex items-center justify-center text-xs font-bold">
                AD
              </div>
              <span className="hidden sm:block text-sm font-medium text-zinc-900">Admin</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
