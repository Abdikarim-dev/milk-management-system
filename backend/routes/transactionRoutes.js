import express from 'express'
import { addManyTransactions, addTransaction, editTransaction, getActiveUserTransactions, getEachTransactionsUser, getMonthlyTransactions, getTransactions, getTransactionsByUser, getTransactionsByUsers, getWeeklyTransactions, removeTransaction, transactionsByDaily, transactionsByDays, transactionsByMonthly, transactionsByWeekly } from '../controllers/transactionController.js';

const transactionRouter = express.Router();

transactionRouter.get('/get-transactions',getTransactions);

transactionRouter.get('/weekly-transactions',getWeeklyTransactions);
transactionRouter.get('/monthly-transactions',getMonthlyTransactions);

transactionRouter.get('/get-transactions-by-days/:id',transactionsByDays);
transactionRouter.get('/get-transactions-by-daily',transactionsByDaily);
transactionRouter.get('/get-transactions-by-weekly/:id',transactionsByWeekly);
transactionRouter.get('/get-transactions-by-monthly/:id',transactionsByMonthly);
transactionRouter.get('/get-transactions-by-active-user/:id',getActiveUserTransactions);
transactionRouter.get('/get-transactions-by-each-user',getEachTransactionsUser);
transactionRouter.get('/get-transactions-by-each-username/:id',getTransactionsByUsers);
transactionRouter.get('/get-transactions-by-user/:id',getTransactionsByUser);
transactionRouter.post('/add-transaction',addTransaction);
transactionRouter.post('/add-transactions',addManyTransactions);
transactionRouter.post('/edit-transaction/:id',editTransaction);
transactionRouter.delete('/remove-transaction/:id',removeTransaction);







export default transactionRouter;
// getTransactionsByUsers
// get-transactions-by-active-user