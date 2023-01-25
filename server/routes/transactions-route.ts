import express from 'express'
import isAuth from '../middlewares/auth';
import transactionsController from '../controllers/transactions.controller.js';
import statisticController from '../controllers/statistic.controller';

const router = express.Router();

router.get('/transactions/:userid', isAuth, transactionsController.getTransactions)

router.get('/transaction/:id', isAuth, transactionsController.getTransaction)

router.post('/transaction/:userid', isAuth, transactionsController.add)

router.patch('/transaction/:id', isAuth, transactionsController.update)

router.delete('/transaction/:id', isAuth, transactionsController.del)

router.get('/statistic/balance/:userid', isAuth, statisticController.balanceChart)

router.get('/statistic/category/:userid', isAuth, statisticController.categoryStatistic)

export default router