const Transaction = require('../models/transaction')

class transactionService {
    async create(newTransaction) {
        const transaction = await new Transaction(newTransaction)
        transaction.save();
        return transaction;
    }
    async getAll({userid, cardid, sort, order, type}) {
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
            const res = await  Transaction.findByIdAndDelete(id)
            console.log(res);
            return 'ok'
        } catch (error) {
            console.log(error);
            return {type: 'error'}
        }
    }
    
}

module.exports = new transactionService()