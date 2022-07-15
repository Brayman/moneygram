const express = require('express')

const walletService = require('../service/walletService')

const router = express.Router();

router.get('/wallets/:userid', async (req, res) => {
    try {
        const wallets = await walletService.getMany(req.params.userid)
        res.json(wallets)
    } catch (err) {
        console.log('get',err);
        res.status(404).json(err)
    }
})
router.get('/wallet/:id', async (req, res) => {
    try {
        const wallet = await walletService.getOne(req.params.id)
        res.json(wallet)
    } catch (err) {
        res.status(404).json(err)
    }
})
router.post('/wallet', async (req, res) => {
    try {
        const {userid, name, balance, currency } = req.body
        const wallet = await walletService.create(userid, name, balance, currency)
        res.json(wallet)
    } catch (error) {
        res.status(404).json(error)
    }
})
router.get('/wallet/balance/:userid', async (req,res) => {
    const balance = await walletService.getBalance(req.params.userid)
    res.json(balance)
})
module.exports = router

