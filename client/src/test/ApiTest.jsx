import { useEffect, useState } from "react";
import { getCostOverview } from "../services/costService";
import { getCloudResources } from "../services/cloudResourceService";

export default function ApiTest() {
  const [result, setResult] = useState({
    loading: true,
    costs: null,
    resources: null,
    error: null,
  });

  useEffect(() => {
    const testApis = async () => {
      try {
        const [costs, resources] = await Promise.all([
          getCostOverview(),
          getCloudResources(),
        ]);

        setResult({
          loading: false,
          costs,
          resources,
          error: null,
        });
      } catch (error) {
        setResult({
          loading: false,
          costs: null,
          resources: null,
          error:
            error.response?.data?.message ||
            error.message ||
            "Failed to connect to the API",
        });
      }
    };

    testApis();
  }, []);

  if (result.loading) {
    return <p className="p-6 text-white">Testing API connection...</p>;
  }

  if (result.error) {
    return (
      <div className="p-6 text-rose-400">
        <h2 className="text-xl font-bold">API Connection Failed</h2>
        <p className="mt-2">{result.error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 text-white">
      <h1 className="text-2xl font-bold">CloudSleuth AI API Test</h1>

      <section>
        <h2 className="text-lg font-semibold text-cyan-400">
          Cost Overview
        </h2>
        <pre className="mt-2 overflow-auto rounded-xl bg-slate-900 p-4 text-sm">
          {JSON.stringify(result.costs, null, 2)}
        </pre>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-cyan-400">
          Cloud Resources
        </h2>
        <pre className="mt-2 overflow-auto rounded-xl bg-slate-900 p-4 text-sm">
          {JSON.stringify(result.resources, null, 2)}
        </pre>
      </section>
    </div>
  );
}
