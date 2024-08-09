import express, { json } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { PORT } from "./config/config.js";

import userRouter from "./routes/userRouter.js";
import transactionRouter from "./routes/transactionRoutes.js";
import tankRouter from "./routes/tankRoutes.js";
import logsRouter from "./routes/logsRoutes.js";
import reportRouter from "./routes/reportRoutes.js";
import smsRouter from "./routes/smsRoutes.js";
import { authenticate } from "./middleware/authMiddleware.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api/users", userRouter);
app.use("/api/transaction",authenticate, transactionRouter);
app.use("/api/tank",authenticate, tankRouter);
app.use("/api/report",authenticate, reportRouter);
app.use("/api/logs",authenticate, logsRouter);
app.use("/api/SMS",authenticate, smsRouter);
app.use("*", (req, res) => {
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
