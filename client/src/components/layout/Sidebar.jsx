
import {
  LayoutDashboard,
  Wallet,
  Activity,
  BrainCircuit,
  Settings,
  Cloud
} from "lucide-react";

const navigation = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Cost Intelligence", icon: Wallet },
  { label: "Incident Center", icon: Activity },
  { label: "AI Investigator", icon: BrainCircuit },
];

export default function Sidebar() {
  return (
    <aside className="flex min-h-screen w-64 shrink-0 flex-col border-r border-slate-800 bg-slate-950 text-slate-300">
      <div className="flex h-20 items-center gap-3 border-b border-slate-800 px-6">
        <div className="rounded-xl bg-cyan-400/10 p-2 text-cyan-400">
          <Cloud size={24} />
        </div>
        <div>
          <h1 className="font-bold tracking-tight text-white">
            CloudSleuth
          </h1>
          <p className="text-xs text-slate-500">AI Operations</p>
        </div>
      </div>

      <div className="px-4 py-6">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
          Workspace
        </p>

        <nav className="space-y-1">
          {navigation.map(({ label, icon: Icon }, index) => (
            <button
              key={label}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${
                index === 0
                  ? "bg-cyan-400/10 font-medium text-cyan-300"
                  : "text-slate-400 hover:bg-slate-900 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto border-t border-slate-800 p-4">
        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white">
          <Settings size={18} />
          Settings
        </button>
        <p className="mt-3 px-3 text-xs text-slate-600">
          CloudSleuth AI · v0.1.0
        </p>
      </div>
    </aside>
  );
}
