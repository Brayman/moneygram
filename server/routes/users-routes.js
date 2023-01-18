const express = require('express')
const userService = require('../service/userService');
const isAuth = require('../middlewares/auth');
const passport = require('passport');
const userController = require('../controllers/user.controller');
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
            const user = await userService.githubRegistration(req.body)
            return res.json(user)
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

router.get('/autho', async (req, res) => {
    if (req.user) {
        const user = await userService.getUserByGithubId(req.user.id)
        res.status(200).json(user);
    }
})

router.get('/user/:id', isAuth, userController.getUser)

router.post('/signin', passport.authenticate('github'), async (req, res) => {
    const user = await userService.login(req.body)
    res.json(user)
})

const clientID = process.env.ClientID;
const clientSecret = process.env.ClientSecret;

passport.use(new GitHubStrategy({
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: "http://localhost:5000/auth/github/callback"
},
    async function (accessToken, refreshToken, profile, cb) {
        cb(null, profile)
    }
));
passport.serializeUser((user, done) => {
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

router.get('/:userid/expense', isAuth, userController.expense)

router.get('/:userid/income', isAuth, userController.income)


module.exports = router