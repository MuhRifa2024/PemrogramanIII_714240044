import { Outlet, useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const PAGE_TITLES = {
  "/dashboard": "Dashboard",
  "/mahasiswa": "Data Mahasiswa",
};

export default function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const pageTitle = useMemo(() => {
    if (location.pathname.startsWith("/mahasiswa")) {
      return "Data Mahasiswa";
    }

    return PAGE_TITLES[location.pathname] ?? "Praktikum";
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex min-h-screen flex-col md:pl-72">
        <Header
          pageTitle={pageTitle}
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        />

        <main className="flex-1 p-3 sm:p-4 md:p-6">
          <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
            <Outlet />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}