import express from "express";
import { getCustomReport, getDailyReport, getMonthlyReport, getUserTransactionReport, getWeeklyReport } from "../controllers/reportController.js";
const router = express.Router();

router.get("/daily", getDailyReport);
router.get("/weekly", getWeeklyReport);
router.get("/monthly", getMonthlyReport);
router.post("/custom", getCustomReport);
router.get("/user/:userId", getUserTransactionReport);

export default router;
