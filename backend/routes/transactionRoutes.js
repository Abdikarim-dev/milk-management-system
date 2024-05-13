import express from 'express'
import { addManyTransactions, addTransaction, editTransaction, getEachTransactionsUser, getTransactions, getTransactionsByUser, getTransactionsByUsers, removeTransaction } from '../controllers/transactionController.js';
import { authUser, authenticate } from '../middleware/authMiddleware.js';
const transactionRouter = express.Router();

transactionRouter.get('/get-transactions/:role',authenticate,authUser,getTransactions);
transactionRouter.get('/get-transactions-by-each-user',getEachTransactionsUser);
transactionRouter.get('/get-transactions-by-each-username',getTransactionsByUsers);
transactionRouter.get('/get-transactions-by-user/:id',authenticate,getTransactionsByUser);
transactionRouter.post('/add-transaction',authenticate,addTransaction);
transactionRouter.post('/add-transactions',authenticate,addManyTransactions);
transactionRouter.post('/edit-transaction/:id',authenticate,editTransaction);
transactionRouter.delete('/remove-transaction/:id/:role',authenticate,authUser,removeTransaction);

export default transactionRouter;