const express = require('express')
const router = express.Router();
const transactionService = require('../service/transactionService');
const userService = require('../service/userService');
const walletService = require('../service/walletService');

router.get('/transactions/:userid', async (req, res) => {
    try {
        const transactions = await transactionService.getAll({ ...req.params, ...req.query })
        res.json(transactions)

    } catch (error) {
        console.log('error',error);
        res.status(404).json(error)
    }
})

router.get('/transaction/:id', async (req, res) => {
    try {
        const transaction = await transactionService.getOne(req.params.id)
        if (transaction.length <= 0) {
            throw new Error('Not exist')
        }
        res.json(transaction)
    } catch (error) {
        console.log('error',error);
        res.status(404).json(error)
    }
})

router.post('/transaction/:userid', async (req, res) => {
    try {
        const transaction = await transactionService.create(req.body)
        const { cardid, cost, type } = req.body
        if (type === 'expense') {
            walletService.changeBalance(cardid, -cost)
        }
        if (type === 'income') {
            walletService.changeBalance(cardid, cost)
        }
        res.json(transaction)
    } catch (error) {
        res.status(404).json(error)
    }
})

router.patch('/transaction/:id', async (req, res) => {
    const { cardid, cost, type } = req.body
    try {
        const oldTrans = await transactionService.getOne(req.params.id)
        const transaction = await transactionService.update(req.params.id, req.body)
        const difference = () => {
            if (type !== oldTrans.type) {
                const value = oldTrans.cost + cost
                if (type === 'income') {
                    return value
                }
                return -value
            }
            const value = oldTrans.cost - cost
            if (type === 'income') {
                return -value
            }
            return value
        }

        await walletService.changeBalance(cardid, difference())
        res.json(transaction)
    } catch (error) {
        res.status(404).json(error)
    }
})

router.delete('/transaction/:id', async (req, res) => {
    try {
        const answer = await transactionService.delete(req.params.id)
        if (answer.type === 'expense') {
            walletService.changeBalance(answer.cardid, answer.cost)
        }
        if (answer.type === 'income') {
            walletService.changeBalance(answer.cardid, -answer.cost)
        }
        res.sendStatus(200)
    } catch (error) {
        res.status(404).json(error)
    }
})
router.get('/:userid/expense', async (req, res) => {
    const expense = await userService.expense(req.params.userid, req.query.duration)
    res.json(expense)
})
router.get('/:userid/income', async (req, res) => {
    const {userid, duration} = req.params
    const income = await userService.income(userid, duration)
    res.json(income)    
})
router.get('/statistic/balance/:userid', async (req, res) => {
    const statistic = await transactionService.getBalanceLine({userid: req.params.userid})
    res.json(statistic)
})
router.get('/statistic/category/:userid', async (req, res) => {
    const statistic = await transactionService.categoryStatistic({userid: req.params.userid, ...req.query})
    res.json(statistic)
})

module.exports = router