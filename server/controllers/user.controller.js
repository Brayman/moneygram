const userService = require("../service/userService.js")

class UserController {
    async getUser(req, res) {
        const id = req.params.id
        try {
            const user = await userService.getUser(id)
            if (!user) {
                throw new Error('not find')
            }
            res.json(user)
        } catch (error) {
            console.log(error);
            res.status(404).json(error)
        }
    }
    async expense(req, res) {
        const expense = await userService.expense(req.params.userid, req.query.duration)
        res.json(expense)
    }
    async income(req, res) {
        const { userid, duration } = req.params
        const income = await userService.income(userid, duration)
        res.json(income)
    }
}

module.exports = new UserController()