import {
  ArrowDownRight,
  ArrowUpRight,
  Activity,
  Wallet,
  ShieldAlert,
  CheckCircle2,
  BrainCircuit,
} from "lucide-react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const metrics = [
  {
    label: "Cloud Spend",
    value: "$12,840",
    change: "+8.2%",
    positive: false,
    icon: Wallet,
    color: "cyan",
  },
  {
    label: "Active Incidents",
    value: "03",
    change: "-2 this week",
    positive: true,
    icon: ShieldAlert,
    color: "rose",
  },
  {
    label: "Services Healthy",
    value: "24/26",
    change: "92.3% healthy",
    positive: true,
    icon: Activity,
    color: "emerald",
  },
  {
    label: "Potential Savings",
    value: "$2,460",
    change: "Monthly estimate",
    positive: true,
    icon: BrainCircuit,
    color: "violet",
  },
];

const incidents = [
  {
    title: "API response time elevated",
    service: "payment-api",
    severity: "High",
    time: "4 min ago",
    color: "rose",
  },
  {
    title: "Unexpected compute cost increase",
    service: "worker-cluster",
    severity: "Medium",
    time: "18 min ago",
    color: "amber",
  },
  {
    title: "Database connection pool warning",
    service: "primary-database",
    severity: "Low",
    time: "42 min ago",
    color: "cyan",
  },
];

const colorClasses = {
  cyan: "bg-cyan-400/10 text-cyan-300",
  rose: "bg-rose-400/10 text-rose-300",
  emerald: "bg-emerald-400/10 text-emerald-300",
  violet: "bg-violet-400/10 text-violet-300",
  amber: "bg-amber-400/10 text-amber-300",
};

const analyticsData = [
  { day: "Thu", spend: 420, incidents: 2 },
  { day: "Fri", spend: 510, incidents: 1 },
  { day: "Sat", spend: 380, incidents: 0 },
  { day: "Sun", spend: 460, incidents: 1 },
  { day: "Mon", spend: 620, incidents: 3 },
  { day: "Tue", spend: 550, incidents: 2 },
  { day: "Wed", spend: 720, incidents: 3 },
];

function MetricCard({ metric }) {
  const Icon = metric.icon;
  const TrendIcon = metric.positive ? ArrowDownRight : ArrowUpRight;

  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="flex items-start justify-between">
        <p className="text-sm text-slate-400">{metric.label}</p>
        <div className={`rounded-xl p-2 ${colorClasses[metric.color]}`}>
          <Icon size={19} />
        </div>
      </div>

      <p className="mt-5 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
        {metric.value}
      </p>

      <div className="mt-3 flex items-center gap-1.5 text-xs">
        <TrendIcon
          size={15}
          className={metric.positive ? "text-emerald-400" : "text-rose-400"}
        />
        <span
          className={metric.positive ? "text-emerald-400" : "text-rose-400"}
        >
          {metric.change}
        </span>
      </div>
    </article>
  );
}

export default function Dashboard() {
  return (
    <div className="mx-auto max-w-[1600px] space-y-8 p-5 md:p-8">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-cyan-400">WEDNESDAY, OCTOBER 28, 2026</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
            Good afternoon, Engineer
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Here's what's happening across your cloud infrastructure.
          </p>
        </div>

        <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
          <Activity size={17} />
          Run Investigation
        </button>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 xl:col-span-2">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="font-semibold text-white">
                Cost & Incident Overview
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Sample data · Last 7 days
              </p>
            </div>
            <span className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-300">
              Last 7 days
            </span>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-950/70 p-5">
              <p className="text-sm text-slate-400">Total cloud spend</p>
              <p className="mt-2 text-2xl font-semibold text-white">
                $3,240.50
              </p>
              <p className="mt-2 text-xs text-rose-300">
                ↑ 12.4% vs previous week
              </p>
            </div>
            <div className="rounded-xl bg-slate-950/70 p-5">
              <p className="text-sm text-slate-400">Incidents detected</p>
              <p className="mt-2 text-2xl font-semibold text-white">12</p>
              <p className="mt-2 text-xs text-emerald-300">
                ↓ 3 vs previous week
              </p>
            </div>
          </div>

          
<div className="mt-6 h-72 w-full">
  <ResponsiveContainer width="100%" height="100%">
    <AreaChart
      data={analyticsData}
      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
    >
      <defs>
        <linearGradient id="spendGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
          <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
        </linearGradient>
      </defs>

      <CartesianGrid
        stroke="#1e293b"
        strokeDasharray="3 3"
        vertical={false}
      />

      <XAxis
        dataKey="day"
        stroke="#64748b"
        tickLine={false}
        axisLine={false}
      />

      <YAxis
        yAxisId="spend"
        stroke="#64748b"
        tickLine={false}
        axisLine={false}
        tickFormatter={(value) => `$${value}`}
      />

      <YAxis
        yAxisId="incidents"
        orientation="right"
        stroke="#64748b"
        tickLine={false}
        axisLine={false}
        allowDecimals={false}
      />

      <Tooltip
        contentStyle={{
          backgroundColor: "#0f172a",
          border: "1px solid #334155",
          borderRadius: "12px",
          color: "#f8fafc",
        }}
      />

      <Legend />

      <Area
        yAxisId="spend"
        type="monotone"
        dataKey="spend"
        name="Cloud Spend ($)"
        stroke="#22d3ee"
        strokeWidth={2}
        fill="url(#spendGradient)"
      />

      <Area
        yAxisId="incidents"
        type="monotone"
        dataKey="incidents"
        name="Incidents"
        stroke="#a78bfa"
        strokeWidth={2}
        fill="none"
      />
    </AreaChart>
  </ResponsiveContainer>
</div>

        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-white">Recent Incidents</h2>
              <p className="mt-1 text-sm text-slate-500">Latest activity</p>
            </div>
            <span className="rounded-lg bg-rose-400/10 px-2.5 py-1 text-xs text-rose-300">
              3 open
            </span>
          </div>

          <div className="mt-5 space-y-5">
            {incidents.map((incident) => (
              <div key={incident.title} className="flex gap-3">
                <div
                  className={`mt-1 h-9 w-9 shrink-0 rounded-xl p-2 ${colorClasses[incident.color]}`}
                >
                  <Activity size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-200">
                    {incident.title}
                  </p>
                  <p className="mt-1 truncate text-xs text-slate-500">
                    {incident.service} · {incident.time}
                  </p>
                  <span
                    className={`mt-2 inline-block rounded-md px-2 py-1 text-xs ${colorClasses[incident.color]}`}
                  >
                    {incident.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-2 border-t border-slate-800 pt-5 text-xs text-slate-500">
            <CheckCircle2 size={16} className="text-emerald-400" />
            Sample dashboard data
          </div>
        </article>
      </section>
    </div>
  );
}
