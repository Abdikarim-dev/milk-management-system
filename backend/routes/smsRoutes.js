import express from "express";
import { getDailySMS } from "../controllers/smsController.js";

const router = express.Router();

router.post("/daily",getDailySMS)

export default router;
