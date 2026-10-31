
import { runInvestigation } from "../services/investigationService.js";
import Investigation from "../models/Investigation.js";

const AI_SERVICE_URL =
  process.env.AI_SERVICE_URL || "http://127.0.0.1:8000";

export const startInvestigation = async (req, res) => {
  try {
    // 1. Run existing rule-based investigation
    const result = await runInvestigation();

    // 2. Request AI-powered analysis from FastAPI
    let aiAnalysis = null;
    let aiAnalysisError = null;

    try {
      const aiResponse = await fetch(
        `${AI_SERVICE_URL}/api/analysis/investigation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            summary: result.summary,
            findings: result.findings,
          }),
          signal: AbortSignal.timeout(30000),
        }
      );

      if (!aiResponse.ok) {
        const errorData = await aiResponse.json().catch(() => ({}));

        throw new Error(
          errorData.detail || `AI service returned ${aiResponse.status}`
        );
      }

      aiAnalysis = await aiResponse.json();

    } catch (aiError) {
      aiAnalysisError = aiError.message;
      console.error("AI analysis unavailable:", aiError.message);
    }

    // 3. Save investigation and AI analysis in MongoDB
    const investigation = await Investigation.create({
      summary: result.summary,
      findings: result.findings,
      aiAnalysis,
      completedAt: new Date(),
    });

    // 4. Return investigation results
    res.status(200).json({
      success: true,
      message: aiAnalysis
        ? "Investigation and AI analysis completed successfully"
        : "Investigation completed, but AI analysis is unavailable",
      data: investigation,
      aiAnalysisAvailable: Boolean(aiAnalysis),
      aiAnalysisError,
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
