import express from "express";
import { authUser, authenticate } from "../middleware/authMiddleware.js";
import {
  addTank,
  editTank,
  getTanks,
  removeTank,
} from "../controllers/tankController.js";
const tankRouter = express.Router();

tankRouter.get("/get-tanks", authenticate, getTanks);
tankRouter.post("/add-tank", authenticate, addTank);
tankRouter.post("/edit-tank/:id", authenticate, editTank);
tankRouter.delete("/remove-tank/:id", authenticate, removeTank);


// tankRouter.get('/get-transactions-by-active-user/:id',authenticate,getActiveUserTransactions);
// tankRouter.get('/get-transactions-by-each-user',getEachTransactionsUser);
// tankRouter.get('/get-transactions-by-each-username/:id',getTransactionsByUsers);
// tankRouter.get('/get-transactions-by-user/:id',authenticate,getTransactionsByUser);
// tankRouter.post('/add-transactions',authenticate,addManyTransactions);

export default tankRouter;
