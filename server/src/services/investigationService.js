import CloudResource from "../models/CloudResource.js";

export const runInvestigation = async () => {
  const resources = await CloudResource.find().sort({ createdAt: -1 });

  const findings = [];

  const totalCost = resources.reduce(
    (sum, resource) => sum + resource.monthlyCost,
    0,
  );

  const averageCost = resources.length > 0 ? totalCost / resources.length : 0;

  for (const resource of resources) {
    // 1. Check resource health
    if (resource.status === "warning") {
      findings.push({
        category: "Resource Health",
        severity: "medium",
        title: "Resource health warning",
        description: `${resource.name} is currently reporting a warning status.`,
        recommendation:
          "Investigate the resource configuration and resolve the reported warning.",
        resourceId: resource.resourceId,
        resourceName: resource.name,
        provider: resource.provider,
      });
    }

    if (resource.status === "unknown") {
      findings.push({
        category: "Resource Health",
        severity: "medium",
        title: "Unknown resource status",
        description: `${resource.name} does not have a confirmed health status.`,
        recommendation:
          "Verify the resource status and update its monitoring information.",
        resourceId: resource.resourceId,
        resourceName: resource.name,
        provider: resource.provider,
      });
    }

    // 2. Check production availability
    if (
      resource.environment === "production" &&
      resource.status === "stopped"
    ) {
      findings.push({
        category: "Availability",
        severity: "high",
        title: "Production resource is stopped",
        description: `${resource.name} is a production resource but is currently stopped.`,
        recommendation:
          "Verify whether this resource should be running and restore availability if required.",
        resourceId: resource.resourceId,
        resourceName: resource.name,
        provider: resource.provider,
      });
    }

    // 3. Check region configuration
    if (
      !resource.region ||
      resource.region.trim().toLowerCase() === "unknown"
    ) {
      findings.push({
        category: "Configuration",
        severity: "low",
        title: "Unknown resource region",
        description: `${resource.name} does not have a properly configured region.`,
        recommendation: "Update the resource with its correct cloud region.",
        resourceId: resource.resourceId,
        resourceName: resource.name,
        provider: resource.provider,
      });
    }

    // 4. Check unusually high cost
    if (averageCost > 0 && resource.monthlyCost > averageCost * 2) {
      findings.push({
        category: "Cost Optimization",
        severity: "medium",
        title: "Unusually high resource cost",
        description: `${resource.name} costs significantly more than the average registered resource.`,
        recommendation:
          "Review its usage, configuration, and available cost optimization opportunities.",
        resourceId: resource.resourceId,
        resourceName: resource.name,
        provider: resource.provider,
      });
    }
  }

  const summary = {
    totalResources: resources.length,
    totalFindings: findings.length,
    high: findings.filter((item) => item.severity === "high").length,
    medium: findings.filter((item) => item.severity === "medium").length,
    low: findings.filter((item) => item.severity === "low").length,
  };

  return {
    summary,
    findings,
  };
};
