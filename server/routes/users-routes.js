const express = require('express')

const Users = require('../models/users');
const userService = require('../service/userService');
const authMiddleware = require('../middlewares/auth-middleware')

const router = express.Router();
router.post('/signup', async (req, res) => {
    try {
        const {login, password, email} = req.body;
        const user = await userService.registration(login, password, email);
        res.cookie('refTok', user.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
        return res.json(user)
    } catch (error) {
        console.log(error);
    }
})

router.post('/logout', async (req, res) => {
    const {refTok} = req.cookies;
    await userService.logout(refTok)
    res.clearCookie('refTok')
    res.sendStatus(200)
})
router.get('/refresh', async (req, res) => {
    try {
        const {refTok} = req.cookies;
        const User = await userService.refresh(refTok)
        res.cookie('refTok', User.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true} )
        res.json(User)
    } catch (error) {
        res.status(401).json(error)
    }
})

router.get('/user/:login', authMiddleware, async (req, res) => {
    const login = req.params.login

    try {
        const user = await Users.find({ login })
        if (user) {
            throw new Error('not find')
        }
        res.json(user)
    } catch (error) {
        console.log(error);
        res.status(404).json(error)
    }
})
router.post('/signin', async (req, res) => {
    const user = await userService.login(req.body)
    res.cookie('refTok', user.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
    res.json(user)
})


module.exports = router