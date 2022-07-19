const Transaction = require('../models/transaction');
const toDecimal = require('../utils/toDecimal');
const fakeExchangeService = require('./fakeExchangeService');
const walletServise = require('./walletService')

class transactionService {
    async create(newTransaction) {
        const transaction = await new Transaction(newTransaction)
        transaction.save();
        return transaction;
    }
    async getOne(id) {
        const transaction = await Transaction.findById(id)
        return transaction
    }
    async getAll({userid, cardid, sort, order, type, duration}) {
        const parametrs = () => {
            let parametrs = {
                userid
            }
            if (type) {
                parametrs.type = type
            }
            if (cardid) {
                parametrs.cardid = cardid
            }
            if (duration) {
                const date = new Date()
                const startDate = new Date(date.getFullYear(), date.getMonth() - 1, 1).toDateString()
                console.log(startDate);
                parametrs.date = {$gt: startDate}
            }
            return parametrs
        }
        const transactions = await Transaction.find(parametrs()).sort({[sort]: order})
        return transactions;
    }
    async update(id, updateData) {
        const updatedTransaction = await Transaction.findByIdAndUpdate(id, updateData, {new: true})
        return updatedTransaction;
    }
    async delete(id) {
        try {
            const res = await Transaction.findByIdAndDelete(id)
            return res
        } catch (error) {
            console.log(error);
            return {type: 'error'}
        }
    }
    async getBalanceLine({userid, cardid}) {
        const transactions =  await this.getAll({userid, cardid, sort: 'date', order: 'desc'})
        let currentBalance = await walletServise.getBalance(userid)
        let balanceLine=[{
            amount: currentBalance,
            date: new Date().toDateString()
        }];
        transactions.forEach(({date, cost, type}) => {
            date = new Date(date).toDateString()
            cost = type === 'expense' ? cost : -cost
            const haveItem = balanceLine.findIndex((transaction) => {
                return transaction.date === date
            })
            currentBalance = toDecimal(currentBalance + cost)
            if (haveItem === -1) {
                
                balanceLine.push({
                    amount: currentBalance,
                    date: new Date(date).toDateString()
                })
            } else {
                balanceLine[haveItem] = {
                    ...balanceLine[haveItem],
                    amount: currentBalance
                }
            }
        })

        return balanceLine.reverse()
    }
    async categoryStatistic (params) {
        const transactions = await this.getAll({...params})
        let statistic = []
        transactions.forEach(({cost, tag, currency}) => {
            const index = statistic.findIndex(({category}) => {
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

module.exports = new transactionService()