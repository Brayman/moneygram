const Transaction = require('../models/transaction');

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
    async getAll({ userid, cardid, sort, order, type, duration, prev }) {
        const parametrs = () => {
            let parametrs = {
                userid
            }
            if (type) {
                parametrs.type = type
            }
            if (cardid) {
                parametrs['$or'] = [{ incomeWallet: cardid }, { outcomeWallet: cardid }]
            }
            if (!!duration) {
                const date = new Date()
                const area = !!prev ? 1 : 0
                const startDate = new Date(date.getFullYear() - (duration === 'year' ? area : 0), date.getMonth() - (duration === 'month' ? area : 0), 1).toDateString()
                console.log(startDate);
                parametrs.date = { $gt: startDate }
                if (prev) {
                    parametrs.date = { $gt: startDate, $lt: new Date().setMonth(date.getMonth(), 0) }
                }
            }
            return parametrs
        }
        const transactions = await Transaction.find(parametrs()).sort({ [sort]: order })
        return transactions;
    }
    async update(id, updateData) {
        const updatedTransaction = await Transaction.findByIdAndUpdate(id, updateData, { new: true })
        return updatedTransaction;
    }
    async delete(id) {
        try {
            const res = await Transaction.findByIdAndDelete(id)
            return res
        } catch (error) {
            console.log(error);
            return { type: 'error' }
        }
    }

}

module.exports = new transactionService()