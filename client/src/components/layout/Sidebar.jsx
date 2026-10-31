
import {
  LayoutDashboard,
  Wallet,
  Activity,
  BrainCircuit,
  Settings,
  Cloud,
  ChevronRight,
  CircleHelp,
  X,
} from "lucide-react";

const navigation = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Cost Intelligence", icon: Wallet },
  { label: "Incident Center", icon: Activity },
  { label: "AI Investigator", icon: BrainCircuit },
];

export default function Sidebar({ onClose }) {
  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-slate-800/80 bg-slate-950 text-slate-300">
      {/* Brand */}
      <div className="flex h-[84px] shrink-0 items-center justify-between gap-3 border-b border-slate-800/80 px-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 shadow-lg shadow-cyan-950/20">
            <Cloud size={24} strokeWidth={2.2} />
          </div>

          <div className="min-w-0">
            <h1 className="text-[15px] font-bold tracking-tight text-white">
              CloudSleuth
            </h1>
            <p className="mt-0.5 text-xs tracking-wide text-slate-500">
              AI Operations
            </p>
          </div>
        </div>

        {/* Mobile close button */}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Main navigation */}
      <div className="px-3 pt-7">
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
          Workspace
        </p>

        <nav className="space-y-1">
          {navigation.map(({ label, icon: Icon }, index) => {
            const active = index === 0;

            return (
              <button
                key={label}
                type="button"
                aria-current={active ? "page" : undefined}
                onClick={onClose}
                className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[13px] transition-all duration-200 ${
                  active
                    ? "bg-cyan-400/[0.10] font-semibold text-cyan-300 ring-1 ring-inset ring-cyan-400/[0.12]"
                    : "text-slate-400 hover:bg-slate-900/80 hover:text-slate-100"
                }`}
              >
                {active && (
                  <span className="absolute bottom-2 left-0 top-2 w-[3px] rounded-r-full bg-cyan-400" />
                )}

                <Icon
                  size={18}
                  strokeWidth={active ? 2.2 : 1.8}
                  className={`shrink-0 transition-colors ${
                    active
                      ? "text-cyan-300"
                      : "text-slate-500 group-hover:text-slate-300"
                  }`}
                />

                <span className="flex-1">{label}</span>

                {active && (
                  <ChevronRight
                    size={15}
                    className="text-cyan-400/70"
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom navigation */}
      <div className="mt-auto px-3 pb-4">
        <div className="mb-4 rounded-xl border border-slate-800/80 bg-slate-900/40 p-3">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.45)]" />
            <span className="text-xs font-medium text-slate-300">
              Workspace status
            </span>
          </div>

          <p className="text-[11px] leading-relaxed text-slate-500">
            Cloud operations workspace
          </p>
        </div>

        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-[13px] text-slate-400 transition hover:bg-slate-900 hover:text-white"
        >
          <Settings size={18} className="text-slate-500" />
          <span className="flex-1 text-left">Settings</span>
        </button>

        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-[13px] text-slate-400 transition hover:bg-slate-900 hover:text-white"
        >
          <CircleHelp size={18} className="text-slate-500" />
          <span className="flex-1 text-left">Help & Support</span>
        </button>

        <div className="mt-3 border-t border-slate-800/80 px-3 pt-4">
          <p className="text-[11px] font-medium text-slate-500">
            CloudSleuth AI
          </p>
          <p className="mt-1 text-[10px] text-slate-600">
            Version 0.1.0
          </p>
        </div>
      </div>
    </aside>
  );
}
