const { users } = require("./db.json")

module.exports = (req, res, next) => {
    if (req.originalUrl === '/login') {
        try {
            const user = users.find(el => el.login === req.body.login)
            if (user.pass == req.body.pass) {
                res.json(user)
            } else {
                res.status(404).jsonp({"body": "wrong login or password"})
            }
        } catch (error) {
            console.error('not found');
            res.status(404).jsonp({"err": "wrong login or password"})
        }  
    } else {
        next() 
    }
    
}