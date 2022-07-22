const tokenService = require("../service/tokenService");

module.exports = function auth(req, res, next) {
    try {
        const autorizationHeader = req.headers.autorization;
        if (!autorizationHeader) {
            throw new Error('not auth header')
        }
        const accessToken = autorizationHeader.split(' ')[1]
        const User = tokenService.valAccessTok(accessToken)
        if (!User) {
            throw new Error('not verified')
        }
        req.user = User
        next()
    } catch (error) {
        console.log('middle error',error.message);
        res.status(401).json(error)
    }
}