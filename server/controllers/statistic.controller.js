const userService = require("../service/userService.js")
const statisticService = require("../service/statistic.service.js")
class StatisticController {
    async balanceChart(req, res) {
        const currency = await userService.getCurrency(req.params.userid)
        const statistic = await statisticService.getBalanceLine({ userid: req.params.userid, currency, duration: req.query.dur })
        res.json(statistic)
    }
    async categoryStatistic(req, res) {
        const statistic = await statisticService.categoryStatistic({ userid: req.params.userid, ...req.query })
        res.json(statistic)
    }
}

module.exports = new StatisticController()