import { useState } from "react";
import {
  Cloud,
  Server,
  Database,
  HardDrive,
  Boxes,
  Zap,
  CircleHelp,
  ChevronDown,
} from "lucide-react";
import { createCloudResource } from "../../services/cloudResourceService";

const initialForm = {
  resourceId: "",
  name: "",
  provider: "AWS",
  resourceType: "Virtual Machine",
  region: "",
  monthlyCost: "",
  status: "running",
  environment: "development",
};

const resourceTypes = [
  { value: "Virtual Machine", label: "Virtual Machine" },
  { value: "Database", label: "Database" },
  { value: "Storage", label: "Storage" },
  { value: "Kubernetes", label: "Kubernetes" },
  { value: "Serverless", label: "Serverless" },
  { value: "Other", label: "Other" },
];

const inputClass =
  "mt-1.5 block w-full min-w-0 box-border rounded-xl border border-slate-700/80 bg-slate-950/80 px-3.5 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 hover:border-slate-600 focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/10";

const selectClass = `${inputClass} cursor-pointer pr-10`;

const labelClass = "block min-w-0 text-sm font-medium text-slate-300";

function StyledSelect({ className, children, ...props }) {
  return (
    <div className="relative mt-1.5 w-full min-w-0">
      <select {...props} className={`${className} mt-0 appearance-none pr-11`}>
        {children}
      </select>

      <ChevronDown
        size={17}
        strokeWidth={1.8}
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
      />
    </div>
  );
}

export default function ResourceForm({ onResourceCreated, onCancel }) {
  const [formData, setFormData] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (error) setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const payload = {
        ...formData,
        monthlyCost: Number(formData.monthlyCost),
      };

      const response = await createCloudResource(payload);

      if (!response.success) {
        throw new Error(response.message || "Failed to register resource.");
      }

      await onResourceCreated?.();
      setFormData(initialForm);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to register cloud resource.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="min-w-0 space-y-6">
      {/* Resource details */}
      <section className="min-w-0 space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
            <Cloud size={17} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">
              Resource details
            </h3>
            <p className="text-xs text-slate-500">
              Identify the resource in your inventory.
            </p>
          </div>
        </div>

        <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
          <label className={labelClass}>
            Resource ID
            <input
              className={inputClass}
              name="resourceId"
              value={formData.resourceId}
              onChange={handleChange}
              placeholder="e.g. aws-vm-002"
              autoComplete="off"
              required
            />
          </label>

          <label className={labelClass}>
            Resource name
            <input
              className={inputClass}
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Production API Server"
              required
            />
          </label>
        </div>
      </section>

      <div className="border-t border-slate-800" />

      {/* Cloud configuration */}
      <section className="min-w-0 space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-400/10 text-violet-300">
            <Server size={17} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">
              Cloud configuration
            </h3>
            <p className="text-xs text-slate-500">
              Choose the provider, resource type, and region.
            </p>
          </div>
        </div>

        <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
          <label className={labelClass}>
            Cloud provider
            <StyledSelect
              name="provider"
              value={formData.provider}
              onChange={handleChange}
              className={selectClass}
            >
              <option value="AWS">Amazon Web Services (AWS)</option>
              <option value="GCP">Google Cloud Platform (GCP)</option>
              <option value="Azure">Microsoft Azure</option>
              <option value="Other">Other</option>
            </StyledSelect>
          </label>

          <label className={labelClass}>
            Resource type
            <StyledSelect
              name="resourceType"
              value={formData.resourceType}
              onChange={handleChange}
              className={selectClass}
            >
              {resourceTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </StyledSelect>
          </label>

          <label className={labelClass}>
            Region
            <input
              className={inputClass}
              name="region"
              value={formData.region}
              onChange={handleChange}
              placeholder="e.g. ap-south-1"
              required
            />
          </label>

          <label className={labelClass}>
            Monthly cost (₹)
            <input
              className={inputClass}
              type="number"
              name="monthlyCost"
              value={formData.monthlyCost}
              onChange={handleChange}
              placeholder="e.g. 150"
              min="0"
              step="0.01"
              required
            />
          </label>
        </div>
      </section>

      <div className="border-t border-slate-800" />

      {/* Resource status */}
      <section className="min-w-0 space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-300">
            <Zap size={17} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">
              Resource status
            </h3>
            <p className="text-xs text-slate-500">
              Set its current state and environment.
            </p>
          </div>
        </div>

        <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
          <label className={labelClass}>
            Status
            <StyledSelect
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={selectClass}
            >
              <option value="running">Running</option>
              <option value="stopped">Stopped</option>
              <option value="warning">Warning</option>
              <option value="unknown">Unknown</option>
            </StyledSelect>
          </label>

          <label className={labelClass}>
            Environment
            <StyledSelect
              name="environment"
              value={formData.environment}
              onChange={handleChange}
              className={selectClass}
            >
              <option value="development">Development</option>
              <option value="staging">Staging</option>
              <option value="production">Production</option>
            </StyledSelect>
          </label>
        </div>
      </section>

      {error && (
        <p
          role="alert"
          className="rounded-xl border border-rose-400/20 bg-rose-400/5 px-4 py-3 text-sm text-rose-300"
        >
          {error}
        </p>
      )}

      {/* Form actions */}
      <div className="flex flex-col-reverse gap-3 border-t border-slate-800 pt-5 sm:flex-row sm:items-center sm:justify-end">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={submitting}
            className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800 disabled:opacity-50"
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Registering..." : "Register Resource"}
        </button>
      </div>
    </form>
  );
}
