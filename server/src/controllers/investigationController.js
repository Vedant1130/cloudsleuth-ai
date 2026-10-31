import { runInvestigation } from "../services/investigationService.js";
import Investigation from "../models/Investigation.js";

export const startInvestigation = async (req, res) => {
  try {
    // Run investigation checks
    const result = await runInvestigation();

    // Save investigation results in MongoDB
    const investigation = await Investigation.create({
      summary: result.summary,
      findings: result.findings,
      completedAt: new Date(),
    });

    res.status(200).json({
      success: true,
      message: "Investigation completed and saved successfully",
      data: investigation,
    });
  } catch (error) {
    console.error("Investigation error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to run and save cloud investigation",
    });
  }
};

export const getInvestigationHistory = async (req, res) => {
  try {
    const investigations = await Investigation.find()
      .sort({ completedAt: -1 })
      .limit(20);

    res.status(200).json({
      success: true,
      count: investigations.length,
      data: investigations,
    });
  } catch (error) {
    console.error("Investigation history error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch investigation history",
    });
  }
};
