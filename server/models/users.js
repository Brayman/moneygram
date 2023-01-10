const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userSchema = Schema({
    login: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    first_name: String,
    second_name: String,
    balance: {
        type: Number,
        default: 0
    },
    currency: String,
    avatar: String,
    language: String,
    githubid: Number,
    refreshToken: String
})

const User = mongoose.model('User', userSchema)
module.exports = User