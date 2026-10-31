import express from "express";
import {
  startInvestigation,
  getInvestigationHistory,
} from "../controllers/investigationController.js";

const router = express.Router();

router.post("/run", startInvestigation);
router.get("/history", getInvestigationHistory);

export default router;
