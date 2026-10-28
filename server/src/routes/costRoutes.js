
import express from "express";
import { getCostOverview } from "../controllers/costController.js";

const router = express.Router();

router.get("/overview", getCostOverview);

export default router;
