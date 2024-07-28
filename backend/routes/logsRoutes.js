import express from "express";
import {
  getDailyLogs,
  getLogsReport,
  getMonthlyLogs,
  getWeeklyLogs,
} from "../controllers/logsController.js";
const router = express.Router();

router.get("/", getLogsReport);
router.get("/:username", getLogsReport);

router.get("/daily", getDailyLogs);
router.get("/daily/:username", getDailyLogs);

router.get("/weekly", getWeeklyLogs);
router.get("/weekly/:username", getWeeklyLogs);

router.get("/monthly", getMonthlyLogs);
router.get("/monthly/:username", getMonthlyLogs);
// router.post("/custom", getCustomReport);
// router.get("/user/:userId", getUserTransactionReport);

export default router;
