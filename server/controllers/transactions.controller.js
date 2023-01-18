const transactionService = require('../service/transactionService.js')
const walletService = require('../service/walletService')
class TransactionsController {
    async getTransactions(req, res) {
        try {
            const transactions = await transactionService.getAll({ ...req.params, ...req.query })
            res.json(transactions)

        } catch (error) {
            if (error.status === 401) {
                res.status(401).json(error)
            }
            console.log('error', error);
            res.status(404).json(error)
        }
    }
    async getTransaction(req, res) {
        try {
            const transaction = await transactionService.getOne(req.params.id)
            if (transaction.length <= 0) {
                throw new Error('Not exist')
            }
            res.json(transaction)
        } catch (error) {
            res.status(404).json(error)
        }
    }

    async add(req, res) {
        try {
            
            const transaction = await transactionService.create(req.body)
            const { cardid, cost, type } = req.body
            if (type === 'expense') {
                walletService.changeBalance(cardid, -cost)
            }
            if (type === 'income') {
                walletService.changeBalance(cardid, cost)
            }
            res.json(transaction)
        } catch (error) {
            res.status(404).json(error)
        }
    }
    async update(req, res) {
        const { cardid, cost, type } = req.body
        try {
            const oldTrans = await transactionService.getOne(req.params.id)
            const { _id, ...form } = req.body
            const transaction = await transactionService.update(_id, form)
            const difference = () => {
                if (type !== oldTrans.type) {
                    const value = oldTrans.cost + cost
                    if (type === 'income') {
                        return value
                    }
                    return -value
                }
                const value = oldTrans.cost - cost
                if (type === 'income') {
                    return -value
                }
                return value
            }
    
            await walletService.changeBalance(cardid, difference())
            res.json(transaction)
        } catch (error) {
            res.status(404).json(error)
        }
    }
    async del(req, res) {
        try {
            const answer = await transactionService.delete(req.params.id)
            if (answer.type === 'expense') {
                walletService.changeBalance(answer.cardid, answer.cost)
            }
            if (answer.type === 'income') {
                walletService.changeBalance(answer.cardid, -answer.cost)
            }
            res.sendStatus(200)
        } catch (error) {
            res.status(404).json(error)
        }
    }
}

module.exports = new TransactionsController()