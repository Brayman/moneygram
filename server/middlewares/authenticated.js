const isAuth = (req, res, next) => {
    console.log('user:', !!req.user);
    if (!!req.user) {
        next()
    } else {
        res.sendStatus(404)
    }
    
}

module.exports = isAuth