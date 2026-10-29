
import { useState } from "react";
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

export default function ResourceForm({ onResourceCreated }) {
  const [formData, setFormData] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
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

      setFormData(initialForm);
      setSuccess("Cloud resource registered successfully.");
      await onResourceCreated?.();
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

  const inputClass =
    "w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400";

  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
      <div className="mb-5">
        <h2 className="font-semibold text-white">Register Cloud Resource</h2>
        <p className="mt-1 text-sm text-slate-400">
          Add a resource to your CloudSleuth inventory.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="space-y-1.5 text-sm text-slate-300">
          Resource ID
          <input
            className={inputClass}
            name="resourceId"
            value={formData.resourceId}
            onChange={handleChange}
            placeholder="e.g. aws-vm-002"
            required
          />
        </label>

        <label className="space-y-1.5 text-sm text-slate-300">
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

        <label className="space-y-1.5 text-sm text-slate-300">
          Cloud provider
          <select
            className={inputClass}
            name="provider"
            value={formData.provider}
            onChange={handleChange}
          >
            <option value="AWS">AWS</option>
            <option value="GCP">GCP</option>
            <option value="Azure">Azure</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label className="space-y-1.5 text-sm text-slate-300">
          Resource type
          <select
            className={inputClass}
            name="resourceType"
            value={formData.resourceType}
            onChange={handleChange}
          >
            <option value="Virtual Machine">Virtual Machine</option>
            <option value="Database">Database</option>
            <option value="Storage">Storage</option>
            <option value="Kubernetes">Kubernetes</option>
            <option value="Serverless">Serverless</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label className="space-y-1.5 text-sm text-slate-300">
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

        <label className="space-y-1.5 text-sm text-slate-300">
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

        <label className="space-y-1.5 text-sm text-slate-300">
          Status
          <select
            className={inputClass}
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="running">Running</option>
            <option value="stopped">Stopped</option>
            <option value="warning">Warning</option>
            <option value="unknown">Unknown</option>
          </select>
        </label>

        <label className="space-y-1.5 text-sm text-slate-300">
          Environment
          <select
            className={inputClass}
            name="environment"
            value={formData.environment}
            onChange={handleChange}
          >
            <option value="development">Development</option>
            <option value="staging">Staging</option>
            <option value="production">Production</option>
          </select>
        </label>

        {error && (
          <p role="alert" className="text-sm text-rose-400 sm:col-span-2">
            {error}
          </p>
        )}

        {success && (
          <p role="status" className="text-sm text-emerald-400 sm:col-span-2">
            {success}
          </p>
        )}

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {submitting ? "Registering..." : "Register Resource"}
          </button>
        </div>
      </form>
    </article>
  );
}
