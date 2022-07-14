const express = require('express')
const router = express.Router();
const transactionService = require('../service/transactionService')
const Transactions = require('../models/transaction');
const walletService = require('../service/walletService');

router.get('/transactions/:userid', async (req, res) => {
    try {
        const transactions = await transactionService.getAll({ ...req.params, ...req.query })
        res.json(transactions)

    } catch (error) {
        console.log(error);
        res.status(404).json(error)
    }
})

router.get('/transaction/:id', async (req, res) => {

    try {
        const transaction = await Transactions.findOne({ id: req.params.id })
        if (transaction.length <= 0) {
            throw new Error('Not exist')
        }
        res.json(transaction)
    } catch (error) {
        console.log(error);
        res.status(404).json(error)
    }
})

router.post('/transaction/:userid', async (req, res) => {
    try {
        const transaction = await transactionService.create(req.body)
        const { cardid, cost, type } = req.body
        if (type === 'expense') {
            walletService.addItem(cardid, -cost)
        }
        if (type === 'income') {
            walletService.addItem(cardid, cost)
        }
        res.json(transaction)
    } catch (error) {
        res.status(404).json(error)
    }
})

router.patch('/transaction/:id', async (req, res) => {
    try {
        const transaction = await transactionService.update(req.params.id, req.body)
        res.json(transaction)
    } catch (error) {
        res.status(404).json(error)
    }
})

router.delete('/transaction/:id', async (req, res) => {
    try {
        const answer = await transactionService.delete(req.params.id)
        console.log(answer);
        res.sendStatus(200)
    } catch (error) {
        res.status(404).json(error)
    }
})

module.exports = router