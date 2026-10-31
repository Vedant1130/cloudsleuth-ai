
import {
  Bell,
  Search,
  ChevronDown,
  Command,
  Menu,
} from "lucide-react";

export default function Topbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 flex min-h-[84px] items-center justify-between gap-3 border-b border-slate-800/80 bg-slate-950/90 px-4 backdrop-blur-xl sm:px-5 md:px-8">
      {/* Page context */}
      <div className="flex min-w-0 items-center gap-3">
        {/* Mobile menu button */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/70 text-slate-300 transition hover:border-cyan-400/40 hover:bg-slate-800 hover:text-cyan-300 lg:hidden"
        >
          <Menu size={20} />
        </button>

        <div className="min-w-0">
          <div className="hidden items-center gap-2 text-xs text-slate-500 sm:flex">
            <span>Workspace</span>
            <span className="text-slate-700">/</span>
            <span className="text-slate-400">Overview</span>
          </div>

          <div className="mt-0.5 flex items-center gap-2.5">
            <h2 className="truncate text-base font-semibold tracking-tight text-white sm:mt-1 sm:text-xl">
              Cloud Operations
            </h2>

            <span className="hidden items-center gap-1.5 rounded-full border border-emerald-400/15 bg-emerald-400/[0.07] px-2 py-1 text-[10px] font-medium text-emerald-300 xl:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Workspace active
            </span>
          </div>
        </div>
      </div>

      {/* Header actions */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        {/* Search */}
        <label className="hidden h-10 items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-900/70 px-3 transition focus-within:border-cyan-400/40 focus-within:ring-2 focus-within:ring-cyan-400/10 sm:flex">
          <Search size={16} className="shrink-0 text-slate-500" />

          <input
            type="search"
            aria-label="Search"
            placeholder="Search anything..."
            className="w-28 bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-600 md:w-36 xl:w-44"
          />

          <kbd className="flex items-center gap-0.5 rounded-md border border-slate-700/80 bg-slate-950 px-1.5 py-1 text-[10px] text-slate-500">
            <Command size={10} />
            K
          </kbd>
        </label>

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/50 text-slate-400 transition hover:border-slate-700 hover:bg-slate-800 hover:text-white"
        >
          <Bell size={18} strokeWidth={1.8} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-slate-950 bg-cyan-400" />
        </button>

        {/* Workspace menu */}
        <button
          type="button"
          className="flex h-10 items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/50 px-2 transition hover:border-slate-700 hover:bg-slate-800 sm:gap-2.5 sm:px-2.5"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-cyan-400/15 bg-cyan-400/10 text-xs font-bold text-cyan-300">
            VS
          </span>

          <span className="hidden text-left sm:block">
            <span className="block text-xs font-medium text-slate-200">
              My Workspace
            </span>
            <span className="mt-0.5 block text-[10px] text-slate-500">
              Cloud Operations
            </span>
          </span>

          <ChevronDown
            size={14}
            className="hidden text-slate-500 sm:block"
          />
        </button>
      </div>
    </header>
  );
}
