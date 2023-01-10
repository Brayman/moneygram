const bcrypt = require('bcrypt');

const UserModel = require('../models/users');
const userObject = require('../dataObjects');

const transactionService = require('./transactionService');
const fakeExchangeService = require('./fakeExchangeService');
const toDecimal = require('../utils/toDecimal');

class UserService {
    async registration(login, password, email) {
        const candidate = await UserModel.findOne({login});
        if (candidate) {
            throw new Error(`Логин: ${login} уже занят`)
        }

        const hashPass = await bcrypt.hash(password, 1)
        const User = await UserModel.create({email, login, password: hashPass})
        const user = new userObject(User)
        
        return user
    }
    async githubRegistration(form) {
        const candidate = await UserModel.findOne({login: form.login});
        if (candidate) {
            throw new Error(`Логин: ${form.login} уже занят`)
        }

        const User = await UserModel.create(form)
        const user = new userObject(User)
        return user
    }
    async login({login, password}) {
        const User = await UserModel.findOne({login});
        if (!User) {
            console.error(`ошибка аунтификации. Нет пользователя ${login}`);
            return {error: `ошибка аунтификации. Неверный логин или пароль`}
        }
        const isPassEquals = await bcrypt.compare(password, User.password);
        if (!isPassEquals) {
            console.error(`ошибка аунтификации. ${login} ввёл неверный пароль`);
            return {error: `ошибка аунтификации. Неверный логин или пароль`}
        }
        const user = new userObject(User)
        return user
    }

    async getUser(_id) {
        const user = await UserModel.findOne({_id});
        return new userObject(user);
    }
    async getCurrency(login) {
        const user = await UserModel.findOne({login});
        return new userObject(user).currency;
    }
    async getUserByGithubId(githubid) {
        const user = await UserModel.findOne({githubid})
        return new userObject(user)
    }
    async expense(userid, duration) {
        const transactions = await transactionService.getAll({userid, type: 'expense', duration})
        const expense = transactions.reduce((sum, {cost, currency}) => {
            if (currency !== 'USD') {
                cost = fakeExchangeService.changeTo(currency, 'USD', cost)
            }
            return sum + cost
        },0)
        return toDecimal(expense)
    }
    async income(userid, duration) {
        const transactions = await transactionService.getAll({userid, type: 'income', duration})
        const income = transactions.reduce((sum, {cost, currency}) => {
            if (currency !== 'USD') {
                cost = fakeExchangeService.changeTo(currency, 'USD', cost)
            }
            return sum + cost
        },0)
        return toDecimal(income)
    }
}

module.exports = new UserService();