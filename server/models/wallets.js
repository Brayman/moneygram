const mongoose = require('mongoose')
const Schema = mongoose.Schema

const walletSchema = new Schema({
    "userid": {
        type: String,
        required: true
    },
    "name": {
        type: String,
        required: true
    },
    "currency": String,
    "balance": {
        type: Number,
        default: 0
    }
})

const Wallet = mongoose.model("Wallet", walletSchema)
module.exports = Wallet


