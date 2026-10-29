import {
  ArrowDownRight,
  ArrowUpRight,
  Activity,
  Wallet,
  ShieldAlert,
  CheckCircle2,
  BrainCircuit,
  Plus,
  X,
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
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { useEffect, useState } from "react";

import { formatCurrency } from "../utils/formatCurrency";
import { getCostOverview } from "../services/costService";
import { getCloudResources } from "../services/cloudResourceService";

import ResourceForm from "../components/dashboard/ResourceForm";

const metrics = [
  {
    label: "Cloud Spend",
    change: "Registered resources",
    positive: true,
    icon: Wallet,
    color: "cyan",
    type: "cloudSpend",
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
    value: "resourceHealth",
    change: "resourceHealth",
    positive: true,
    icon: Activity,
    color: "emerald",
  },
  {
    label: "Potential Savings",
    value: formatCurrency(2460),
    change: "Sample estimate",
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

const providerColors = [
  "#22d3ee", // Cyan
  "#a78bfa", // Violet
  "#34d399", // Emerald
  "#fbbf24", // Amber
  "#fb7185", // Rose
];

const analyticsData = [
  { day: "Thu", spend: 420, incidents: 2 },
  { day: "Fri", spend: 510, incidents: 1 },
  { day: "Sat", spend: 380, incidents: 0 },
  { day: "Sun", spend: 460, incidents: 1 },
  { day: "Mon", spend: 620, incidents: 3 },
  { day: "Tue", spend: 550, incidents: 2 },
  { day: "Wed", spend: 720, incidents: 3 },
];

function MetricCard({ metric, costOverview, costLoading, costError }) {
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
        {metric.type === "cloudSpend"
          ? costLoading
            ? "Loading..."
            : costError
              ? "Unavailable"
              : formatCurrency(costOverview?.summary?.totalMonthlyCost ?? 0)
          : metric.value === "resourceHealth"
            ? costLoading
              ? "Loading..."
              : costError
                ? "Unavailable"
                : `${costOverview?.summary?.runningResources ?? 0}/${costOverview?.summary?.resourceCount ?? 0}`
            : metric.value}
      </p>

      <div className="mt-3 flex items-center gap-1.5 text-xs">
        <TrendIcon
          size={15}
          className={metric.positive ? "text-emerald-400" : "text-rose-400"}
        />
        <span
          className={metric.positive ? "text-emerald-400" : "text-rose-400"}
        >
          {metric.change === "resourceHealth"
            ? costLoading
              ? "Checking resource health..."
              : costError
                ? "Health unavailable"
                : `${
                    costOverview?.summary?.resourceCount
                      ? Math.round(
                          (costOverview.summary.runningResources /
                            costOverview.summary.resourceCount) *
                            100,
                        )
                      : 0
                  }% of resources running`
            : metric.change}
        </span>
      </div>
    </article>
  );
}

function ProviderCostBreakdown({ providers, loading, error }) {
  const chartData = (providers || []).filter(
    (provider) => provider.totalMonthlyCost > 0,
  );

  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
      <h2 className="font-semibold text-white">Provider Cost Breakdown</h2>
      <p className="mt-1 text-sm text-slate-500">
        Monthly cost by cloud provider
      </p>

      {loading ? (
        <p className="mt-6 text-sm text-slate-400">Loading provider costs...</p>
      ) : error ? (
        <p className="mt-6 text-sm text-rose-400">
          Provider costs unavailable.
        </p>
      ) : chartData.length === 0 ? (
        <p className="mt-6 text-sm text-slate-400">
          No provider costs available yet.
        </p>
      ) : (
        <>
          <div className="relative mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="totalMonthlyCost"
                  nameKey="provider"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={82}
                  paddingAngle={3}
                >
                  {chartData.map((provider, index) => (
                    <Cell
                      key={provider.provider}
                      fill={providerColors[index % providerColors.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value) => [formatCurrency(value), "Monthly cost"]}
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid #334155",
                    borderRadius: "12px",
                    color: "#f8fafc",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xs text-slate-400">Total / month</span>
              <span className="text-base font-semibold text-white">
                {formatCurrency(
                  chartData.reduce(
                    (total, provider) => total + provider.totalMonthlyCost,
                    0,
                  ),
                )}
              </span>
            </div>
          </div>

          <div className="mt-3 space-y-3">
            {chartData.map((provider, index) => (
              <div
                key={provider.provider}
                className="flex items-center justify-between gap-3"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className="h-3 w-3 shrink-0 rounded-full"
                    style={{
                      backgroundColor:
                        providerColors[index % providerColors.length],
                    }}
                  />
                  <span className="truncate text-sm text-slate-300">
                    {provider.provider}
                  </span>
                  <span className="text-xs text-slate-500">
                    ({provider.resourceCount})
                  </span>
                </div>

                <span className="text-sm font-medium text-white">
                  {formatCurrency(provider.totalMonthlyCost)}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </article>
  );
}

function TopCostResources({ resources, loading, error }) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
      <div className="mb-5">
        <h2 className="font-semibold text-white">Top Cost Resources</h2>
        <p className="mt-1 text-sm text-slate-500">
          Highest monthly costs among registered resources
        </p>
      </div>

      {loading ? (
        <p className="text-sm text-slate-400">Loading cost resources...</p>
      ) : error ? (
        <p className="text-sm text-rose-400">Cost resources unavailable.</p>
      ) : !resources?.length ? (
        <p className="text-sm text-slate-400">No registered resources found.</p>
      ) : (
        <div className="space-y-3">
          {resources.map((resource) => (
            <div
              key={resource._id || resource.resourceId}
              className="flex flex-col justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-4 sm:flex-row sm:items-center"
            >
              <div className="min-w-0">
                <p className="truncate font-medium text-white">
                  {resource.name}
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  {resource.provider} · {resource.resourceType}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {resource.region} · {resource.status}
                </p>
              </div>

              <div className="shrink-0 sm:text-right">
                <p className="font-semibold text-cyan-300">
                  {formatCurrency(resource.monthlyCost)}
                </p>
                <p className="text-xs text-slate-500">per month</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

export default function Dashboard() {
  const [costOverview, setCostOverview] = useState(null);
  const [costLoading, setCostLoading] = useState(true);
  const [costError, setCostError] = useState("");

  const [cloudResources, setCloudResources] = useState([]);
  const [resourcesLoading, setResourcesLoading] = useState(true);
  const [resourcesError, setResourcesError] = useState("");
  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);

  const fetchCostOverview = async () => {
    try {
      setCostError("");

      const response = await getCostOverview();

      if (response.success) {
        setCostOverview(response.data);
      } else {
        setCostError("Unable to load cloud costs.");
      }
    } catch (error) {
      console.error("Failed to fetch cost overview:", error);
      setCostError("Unable to load cloud costs.");
    } finally {
      setCostLoading(false);
    }
  };

  const fetchCloudResources = async () => {
    try {
      setResourcesError("");

      const response = await getCloudResources();

      if (response.success) {
        setCloudResources(response.data);
      } else {
        setResourcesError("Unable to load cloud resources.");
      }
    } catch (error) {
      console.error("Failed to fetch cloud resources:", error);
      setResourcesError("Unable to load cloud resources.");
    } finally {
      setResourcesLoading(false);
    }
  };

  useEffect(() => {
    fetchCostOverview();
    fetchCloudResources();
  }, []);

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
          <MetricCard
            key={metric.label}
            metric={metric}
            costOverview={costOverview}
            costLoading={costLoading}
            costError={costError}
          />
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
                {formatCurrency(3240.5)}
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
                  <linearGradient
                    id="spendGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
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
                  tickFormatter={(value) => formatCurrency(value)}
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
                  formatter={(value, name) =>
                    name === "Cloud Spend (₹)"
                      ? [formatCurrency(value), name]
                      : [value, name]
                  }
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
                  name="Cloud Spend (₹)"
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

        <ProviderCostBreakdown
          providers={costOverview?.providers ?? []}
          loading={costLoading}
          error={costError}
        />

        <TopCostResources
          resources={costOverview?.topResources ?? []}
          loading={costLoading}
          error={costError}
        />

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

      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <div className="mb-5">
          <h2 className="font-semibold text-white">
            Registered Cloud Resources
          </h2>
          <p className="mt-1 text-sm text-slate-500">Live data from MongoDB</p>

          <button
            type="button"
            onClick={() => setIsResourceModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            <Plus size={17} />
            Register Resource
          </button>
        </div>

        {resourcesLoading ? (
          <p className="text-sm text-slate-400">Loading cloud resources...</p>
        ) : resourcesError ? (
          <p className="text-sm text-rose-400">{resourcesError}</p>
        ) : cloudResources.length === 0 ? (
          <p className="text-sm text-slate-400">
            No cloud resources registered yet.
          </p>
        ) : (
          <div className="space-y-3">
            {cloudResources.map((resource) => (
              <div
                key={resource._id}
                className="flex flex-col justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-4 sm:flex-row sm:items-center"
              >
                <div>
                  <p className="font-medium text-white">{resource.name}</p>
                  <p className="mt-1 text-sm text-slate-400">
                    {resource.provider} · {resource.resourceType} ·{" "}
                    {resource.region}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm text-slate-300">
                    {resource.status}
                  </span>
                  <span className="font-semibold text-cyan-300">
                    {formatCurrency(resource.monthlyCost)}/mo
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {isResourceModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
          onClick={() => setIsResourceModalOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="resource-modal-title"
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-2xl sm:p-7"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2
                  id="resource-modal-title"
                  className="text-xl font-semibold text-white"
                >
                  Register Cloud Resource
                </h2>

                <p className="mt-2 text-sm text-slate-400">
                  Add a resource to your CloudSleuth inventory.
                </p>
              </div>

              <button
                type="button"
                aria-label="Close registration form"
                onClick={() => setIsResourceModalOpen(false)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <ResourceForm
              onResourceCreated={() => {
                setIsResourceModalOpen(false);
                fetchCostOverview();
                fetchCloudResources();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
