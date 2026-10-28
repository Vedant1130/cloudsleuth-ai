
import CloudResource from "../models/CloudResource.js";

export const getCostSummary = async () => {
  const summary = await CloudResource.aggregate([
    {
      $group: {
        _id: null,
        totalMonthlyCost: { $sum: "$monthlyCost" },
        resourceCount: { $sum: 1 },
        runningResources: {
          $sum: {
            $cond: [{ $eq: ["$status", "running"] }, 1, 0],
          },
        },
      },
    },
  ]);

  return (
    summary[0] || {
      totalMonthlyCost: 0,
      resourceCount: 0,
      runningResources: 0,
    }
  );
};

export const getProviderBreakdown = async () => {
  return CloudResource.aggregate([
    {
      $group: {
        _id: "$provider",
        totalMonthlyCost: { $sum: "$monthlyCost" },
        resourceCount: { $sum: 1 },
      },
    },
    {
      $sort: { totalMonthlyCost: -1 },
    },
  ]);
};

export const getTopCostResources = async () => {
  return CloudResource.find()
    .sort({ monthlyCost: -1 })
    .limit(5)
    .select("resourceId name provider resourceType monthlyCost status region");
};
