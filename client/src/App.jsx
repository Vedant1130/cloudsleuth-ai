
import { useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen">
        {/* Desktop sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Mobile sidebar drawer */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Background overlay */}
            <button
              type="button"
              aria-label="Close navigation menu"
              onClick={closeSidebar}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            {/* Sidebar */}
            <div className="absolute inset-y-0 left-0 z-10 animate-slide-in">
              <Sidebar onClose={closeSidebar} />
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="min-w-0 flex-1">
          <Topbar onMenuClick={() => setSidebarOpen(true)} />

          <main>
            <Dashboard />
          </main>
        </div>
      </div>
    </div>
  );
}
