const Transaction = require('../models/transaction')

class transactionService {
    async create(newTransaction) {
        const transaction = await new Transaction(newTransaction)
        transaction.save()
        return transaction
    }
}

module.exports = new transactionService()