const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    "userid": {
        type: String,
        required: true
    },
    "date": Date,
    "card": String,
    "cost": {
        type: Number,
        required: true
    },
    "payee": String,
    "tag": String,
    "type": {
        type: String,
        required: true
    },
    "currency": String,
    "cardid": {
        type: String,
        required: true
    },
})

const Transaction = mongoose.model('Transaction', transactionSchema)
module.exports = Transaction;