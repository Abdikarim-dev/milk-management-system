import express from "express";
import { getDailyLogs, getLogsReport, getMonthlyLogs, getWeeklyLogs } from "../controllers/logsController.js";
const router = express.Router();

router.get("/", getLogsReport);
router.get("/daily", getDailyLogs);
router.get("/weekly", getWeeklyLogs);
router.get("/monthly", getMonthlyLogs);
// router.post("/custom", getCustomReport);
// router.get("/user/:userId", getUserTransactionReport);

export default router;