const express = require('express')
const router = express.Router();

const Transactions = require('../models/transaction')

router.get('/transactions/:user', async (req, res) => {
    
    try {
        const transaction = await Transactions.find({ userid: req.params.user })
        if (transaction.length <= 0) {
            throw 'not find'
        }
        res.json(transaction)
    } catch (error) {
        console.log(error);
        res.status(404).json(error)
    }
})

router.get('/transaction/:id', async (req, res) => {
    
    try {
        const transaction = await Transactions.findOne({ id: req.params.id })
        if (transaction.length <= 0) {
            throw 'not find'
        }
        res.json(transaction)
    } catch (error) {
        console.log(error);
        res.status(404).json(error)
    }
})

module.exports = router