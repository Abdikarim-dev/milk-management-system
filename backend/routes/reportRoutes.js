import express from "express";
import { getAdminSMS, getCustomReport, getDailyReport, getMonthlyReport, getUserSMS, getUserTransactionReport, getWeeklyReport } from "../controllers/reportController.js";
const router = express.Router();

router.get("/daily", getDailyReport);
router.get("/daily/:id", getDailyReport);

router.get("/weekly", getWeeklyReport);
router.get("/weekly/:id", getWeeklyReport);

router.get("/monthly", getMonthlyReport);
router.get("/monthly/:id", getMonthlyReport);

router.post("/custom", getCustomReport);

router.post("/SMS-API/admin", getAdminSMS)
router.post("/SMS-API/user", getUserSMS)

router.get("/user/:userId", getUserTransactionReport);

export default router;
