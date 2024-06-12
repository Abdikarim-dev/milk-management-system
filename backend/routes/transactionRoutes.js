import express from 'express'
import { addManyTransactions, addTransaction, editTransaction, getActiveUserTransactions, getEachTransactionsUser, getTransactions, getTransactionsByUser, getTransactionsByUsers, removeTransaction, transactionsByDaily, transactionsByDays, transactionsByMonthly, transactionsByWeekly } from '../controllers/transactionController.js';
import { authUser, authenticate } from '../middleware/authMiddleware.js';
const transactionRouter = express.Router();

transactionRouter.get('/get-transactions',authenticate,getTransactions);
transactionRouter.get('/get-transactions-by-days/:id',authenticate,transactionsByDays);
transactionRouter.get('/get-transactions-by-daily',authenticate,transactionsByDaily);
transactionRouter.get('/get-transactions-by-weekly',authenticate,transactionsByWeekly);
transactionRouter.get('/get-transactions-by-monthly/:id',authenticate,transactionsByMonthly);
transactionRouter.get('/get-transactions-by-active-user/:id',authenticate,getActiveUserTransactions);
transactionRouter.get('/get-transactions-by-each-user',getEachTransactionsUser);
transactionRouter.get('/get-transactions-by-each-username/:id',getTransactionsByUsers);
transactionRouter.get('/get-transactions-by-user/:id',authenticate,getTransactionsByUser);
transactionRouter.post('/add-transaction',authenticate,addTransaction);
transactionRouter.post('/add-transactions',authenticate,addManyTransactions);
transactionRouter.post('/edit-transaction/:id',authenticate,editTransaction);
transactionRouter.delete('/remove-transaction/:id',authenticate,removeTransaction);

export default transactionRouter;
// getTransactionsByUsers
// get-transactions-by-active-user