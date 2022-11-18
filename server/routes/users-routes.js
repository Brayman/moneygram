const express = require('express')

const Users = require('../models/users');
const userService = require('../service/userService');
const isAuth = require('../middlewares/authenticated');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const router = express.Router();

router.get('/signup/github', isAuth, async (req, res) => {
    const { login, id, email, avatar_url } = req.user._json
    res.json({ login, githubid: id, email, avatar: avatar_url })
})

router.post('/signup', async (req, res) => {
    try {
        const { login, password, email, githubid } = req.body;
        if (!!githubid) {
            console.log({...req.body});
            const user = await userService.githubRegistration(req.body)
            return res.json({
                accessToken: '',
                refreshToken: '',
                user
            })
        }
        const user = await userService.registration(login, password, email);
        res.cookie('refTok', user.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
        return res.json(user)
    } catch (error) {
        console.log(error);
    }
})

router.post('/logout', async (req, res) => {
    const { refTok } = req.cookies;
    await userService.logout(refTok)
    res.clearCookie('refTok')
    res.sendStatus(200)
})
router.get('/refresh', async (req, res) => {
    try {
        const { refTok } = req.cookies;
        const User = await userService.refresh(refTok)
        res.cookie('refTok', User.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
        res.json(User)
    } catch (error) {
        res.status(401).json(error)
    }
})

router.get('/autho', async (req, res) => {
    if (req.user) {
        console.log('all right');
        const user = await userService.getUserByGithubId(req.user.id)
        res.status(200).json(user);
    }
})

router.get('/user/:login', isAuth, async (req, res) => {
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
router.post('/signin', passport.authenticate('github'), async (req, res) => {
    console.log(res.user);
    const user = await userService.login(req.body)
    res.cookie('refTok', user.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
    res.json(user)
})

const clientID = "d2799f3ce3d6e393b61b";
const clientSecret = "866c03fada64c539c09f2541d0e5950d260b7060";

passport.use(new GitHubStrategy({
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: "http://localhost:5000/auth/github/callback"
},
    async function (accessToken, refreshToken, profile, cb) {
        cb(null, profile)
    }
));
passport.use(new GitHubStrategy({
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: "http://localhost:5000/auth/github/callback"
},
    async function (accessToken, refreshToken, profile, cb) {
        console.log('signup');

        cb(null, profile)
    }
));
passport.serializeUser((user, done) => {
    console.log('ok');
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})
router.get('/github', passport.authenticate('github', { scope: ['profile'] }))

router.get('/auth/github/callback',
    passport.authenticate('github', {
        failureRedirect: '/login'
    }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('http://localhost:3000/')

    });

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect('http://localhost:3000/');
});

module.exports = router