const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    "userid": {
        type: String,
        required: true
    },
    "date": Date,
    "card": String,
    "cost": Number,
    "payee": String,
    "tag": String,
    "type": {
        type: String,
        required: true
    },
    "currency": String,
    "cardid": String,
    "category": String,
    "comment": String,
    "outcomeWallet": String,
    "outcome": Number,
    "outcomeCurrency": String,
    "incomeWallet": String,
    "income": Number,
    "incomeCurrency": String,
})

const Transaction = mongoose.model('Transaction', transactionSchema)
module.exports = Transaction;