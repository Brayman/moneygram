import transactionService  from './transactionService';

const toDecimal = require('../utils/toDecimal');
const fakeExchangeService = require('./fakeExchangeService');
const walletServise = require('./walletService')
class StatisticServise {
    async getBalanceLine({ userid, cardid, currency  }) {
        const transactions = await transactionService.getAll({ userid, cardid, sort: 'date', order: 'desc', duration: 'month' })
        const prevTransactions = await transactionService.getAll({ userid, cardid, sort: 'date', order: 'desc', duration: 'month', prev: true })
        class balance {
            _balance = 0
            constructor(balance) {
                this._balance = balance
            }

            get balance() {
                return this._balance
            }
            set balance(balance) {
                this._balance = balance
            }
            setBalance = (balance) => {
                this.balance = balance
            }
        }
        function createLine(items, balance, setBalance, mainCurrency) {
            let Line = []
            for (let i = 31; i > 0; i--) {
                const daySpend = items.filter((item) => new Date(item.date).getDate() === i)
                if (daySpend.length === 0) {
                    Line.push({ amount: balance.balance, date: i })
                } else {
                    daySpend.forEach(({ cost, type, currency }) => {
                        if (currency !== mainCurrency) {
                            cost = fakeExchangeService.changeTo(currency, mainCurrency, cost)
                        }
                        cost = type === 'expense' ? cost : -cost
                        setBalance(toDecimal(balance.balance + cost))
                    })
                    Line.push({ amount: balance.balance, date: i })
                }

            }
            return Line.reverse()
        }
        const currentBalance = new balance(await walletServise.getBalance(userid, currency))
        const balanceLine = createLine(transactions, currentBalance, currentBalance.setBalance, currency)
        const prevBalanceLine = createLine(prevTransactions, currentBalance, currentBalance.setBalance, currency)
        return [balanceLine, prevBalanceLine]
    }



    async categoryStatistic(params) {
        const transactions = await transactionService.getAll({ ...params })
        let statistic = []
        transactions.forEach(({ cost, tag, currency }) => {
            const index = statistic.findIndex(({ category }) => {
                return category === tag
            })
            const convertedAmount = fakeExchangeService.changeTo(currency, 'USD', cost)
            if (index !== -1) {
                statistic[index] = {
                    ...statistic[index],
                    amount: statistic[index].amount + convertedAmount
                }
                return;
            }
            statistic.push({
                category: tag,
                amount: convertedAmount
            })
        })
        return statistic
    }
}

module.exports = new StatisticServise()