
import { Bell, Search, ChevronDown } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex min-h-20 items-center justify-between gap-4 border-b border-slate-800 bg-slate-950/80 px-5 md:px-8">
      <div>
        <p className="text-sm text-slate-500">Workspace / Overview</p>
        <h2 className="mt-1 text-lg font-semibold text-white">
          Cloud Operations
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 sm:flex">
          <Search size={16} className="text-slate-500" />
          <input
            type="search"
            placeholder="Search anything..."
            className="w-36 bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
          />
          <kbd className="rounded border border-slate-700 px-1.5 text-xs text-slate-500">
            ⌘ K
          </kbd>
        </div>

        <button
          aria-label="Notifications"
          className="relative rounded-xl border border-slate-800 p-2.5 text-slate-400 hover:bg-slate-900 hover:text-white"
        >
          <Bell size={18} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-cyan-400" />
        </button>

        <button className="flex items-center gap-2 rounded-xl border border-slate-800 p-2 text-sm text-slate-300">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400/10 font-semibold text-cyan-300">
            VS
          </span>
          <span className="hidden md:block">My Workspace</span>
          <ChevronDown size={15} className="hidden md:block" />
        </button>
      </div>
    </header>
  );
}