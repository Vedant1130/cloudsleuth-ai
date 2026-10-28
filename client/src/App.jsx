
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex">
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        <div className="min-w-0 flex-1">
          <Topbar />
          <main>
            <Dashboard />
          </main>
        </div>
      </div>
    </div>
  );
}
