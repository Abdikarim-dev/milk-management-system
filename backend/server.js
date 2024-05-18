import express, { json } from "express";
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { PORT } from "./config/config.js";

import userRouter from "./routes/userRouter.js"; 
import transactionRouter from "./routes/transactionRoutes.js";

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(cors())
app.use("/api/users", userRouter);
app.use("/api/transaction", transactionRouter);
app.use('*',(req,res)=>{
  res.redirect("/")
})


app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
