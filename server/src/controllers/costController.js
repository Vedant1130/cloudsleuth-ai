
import {
  getCostSummary,
  getProviderBreakdown,
  getTopCostResources,
} from "../services/costService.js";

export const getCostOverview = async (req, res) => {
  try {
    const [summary, providers, topResources] = await Promise.all([
      getCostSummary(),
      getProviderBreakdown(),
      getTopCostResources(),
    ]);

    res.status(200).json({
      success: true,
      data: {
        summary,
        providers: providers.map((provider) => ({
          provider: provider._id,
          totalMonthlyCost: provider.totalMonthlyCost,
          resourceCount: provider.resourceCount,
        })),
        topResources,
      },
    });
  } catch (error) {
    console.error("Cost overview error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to calculate cloud costs",
    });
  }
};
