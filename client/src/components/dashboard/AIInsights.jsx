
import {
  Sparkles,
  Lightbulb,
  ShieldAlert,
  ListChecks,
  AlertCircle,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";

function AIInsights({ aiAnalysis }) {
  if (!aiAnalysis) {
    return (
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-violet-400/10 p-2.5">
            <Sparkles className="text-violet-300" size={22} />
          </div>

          <div>
            <h3 className="font-semibold text-white">
              CloudSleuth AI Insights
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Gemini-powered cloud infrastructure analysis
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-amber-400/20 bg-amber-400/5 p-5 text-center">
          <AlertCircle
            size={26}
            className="mx-auto text-amber-300"
          />

          <p className="mt-2 font-medium text-amber-200">
            AI analysis unavailable
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Run an investigation to generate AI-powered insights.
          </p>
        </div>
      </section>
    );
  }

  const {
    overview,
    key_insights = [],
    prioritized_actions = [],
    risk_assessment,
  } = aiAnalysis;

  const normalizedRisk = (risk_assessment || "").toLowerCase();

  const riskStyle = normalizedRisk.includes("high")
    ? {
        label: "High Risk",
        classes:
          "border-rose-400/20 bg-rose-400/10 text-rose-300",
        icon: "text-rose-300",
      }
    : normalizedRisk.includes("moderate")
      ? {
          label: "Moderate Risk",
          classes:
            "border-amber-400/20 bg-amber-400/10 text-amber-300",
          icon: "text-amber-300",
        }
      : {
          label: "Low Risk",
          classes:
            "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
          icon: "text-emerald-300",
        };

  return (
    <section className="overflow-hidden rounded-2xl border border-violet-400/20 bg-slate-900/60">

      {/* Header */}
      <div className="flex flex-col justify-between gap-3 border-b border-slate-800 bg-gradient-to-r from-violet-500/10 via-transparent to-cyan-500/5 p-5 sm:flex-row sm:items-center sm:p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-violet-400/20 bg-violet-400/10 p-3">
            <Sparkles size={23} className="text-violet-300" />
          </div>

          <div>
            <h2 className="font-semibold text-white">
              CloudSleuth AI Insights
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Intelligent analysis powered by Google Gemini
            </p>
          </div>
        </div>

        <span className="flex w-fit items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-300">
          <CheckCircle2 size={14} />
          Analysis Complete
        </span>
      </div>

      <div className="space-y-6 p-5 sm:p-6">

        {/* Overview and Risk */}
        <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">

          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <div className="mb-3 flex items-center gap-2">
              <Lightbulb size={18} className="text-amber-300" />

              <h3 className="text-sm font-semibold text-white">
                Infrastructure Overview
              </h3>
            </div>

            <p className="text-sm leading-7 text-slate-400">
              {overview}
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <div className="mb-3 flex items-center gap-2">
              <ShieldAlert size={18} className="text-violet-300" />

              <h3 className="text-sm font-semibold text-white">
                Risk Assessment
              </h3>
            </div>

            <div className={`inline-flex rounded-lg border px-3 py-1.5 text-sm font-semibold ${riskStyle.classes}`}>
              {riskStyle.label}
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              {risk_assessment}
            </p>
          </div>
        </div>

        {/* Key Insights */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <Sparkles size={18} className="text-violet-300" />

            <h3 className="text-sm font-semibold text-white">
              Key Insights
            </h3>

            <span className="rounded-md bg-violet-400/10 px-2 py-0.5 text-xs text-violet-300">
              {key_insights.length}
            </span>
          </div>

          {key_insights.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {key_insights.map((insight, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-4 transition hover:border-violet-400/30"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-400/10 text-sm font-semibold text-violet-300">
                    {index + 1}
                  </div>

                  <p className="text-sm leading-6 text-slate-400">
                    {insight}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">
              No additional insights available.
            </p>
          )}
        </div>

        {/* Prioritized Actions */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <ListChecks size={18} className="text-cyan-300" />

            <h3 className="text-sm font-semibold text-white">
              Prioritized Actions
            </h3>

            <span className="rounded-md bg-cyan-400/10 px-2 py-0.5 text-xs text-cyan-300">
              {prioritized_actions.length}
            </span>
          </div>

          {prioritized_actions.length > 0 ? (
            <div className="space-y-3">
              {prioritized_actions.map((action, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-xl border border-cyan-400/10 bg-cyan-400/5 p-4 transition hover:border-cyan-400/30"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-sm font-semibold text-cyan-300">
                    {index + 1}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-cyan-300">
                      Priority {index + 1}
                    </p>

                    <p className="mt-1 text-sm leading-6 text-slate-300">
                      {action}
                    </p>
                  </div>

                  <ArrowUpRight
                    size={16}
                    className="mt-1 shrink-0 text-slate-600"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">
              No prioritized actions available.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default AIInsights;
