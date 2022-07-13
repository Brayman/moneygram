const express = require('express')
const crypto = require('crypto')

const Users = require('../models/users');
const userService = require('../service/userService');


const router = express.Router();
router.get('/user/:login', async (req, res) => {
    const login = req.params.login

    try {
        const user = await Users.find({ login })
        if (user) {
            throw 'not find'
        }
        res.json(user)
    } catch (error) {
        console.log(error);
        res.status(404).json(error)
    }
})

router.post('/signin', async (req, res) => {

    const user = await userService.login(req.body)
    res.cookie('refreshToken', user.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
    res.json(user)
})
router.post('/signup', async (req, res, next) => {
    try {
        const {login, password, email} = req.body;
        const userData = await userService.registration(login, password, email);
        res.cookie('refTok', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
        return res.json(userData)
    } catch (error) {
        console.log(error);
    }
})

module.exports = router