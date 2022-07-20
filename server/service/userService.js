const UserModel = require('../models/users');
const bcrypt = require('bcrypt');
const TokenService = require('./tokenService');
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
        const user = await UserModel.create({email, login, password: hashPass})
        const tokens = TokenService.geterateToken({user: user.login})
        await TokenService.saveToken(user.login, tokens.refreshToken);

        return {...tokens, user}
    }
    async login({login, password}) {
        const user = await UserModel.findOne({login});
        if (!user) {
            console.log(`ошибка аунтификации. Нет пользователя ${login}`);
            return {error: `ошибка аунтификации. Неверный логин или пароль`}
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            console.log(`ошибка аунтификации. ${login} ввёл неверный пароль`);
            return {error: `ошибка аунтификации. Неверный логин или пароль`}
        }
        const tokens = TokenService.geterateToken({user: user.login})
        await TokenService.saveToken(user.login, tokens.refreshToken);

        console.log(`${login} вошёл`);
        return {...tokens, user}
    }
    async logout(refreshToken) {
        await TokenService.removeToken(refreshToken);
        return;

    }
    async refresh(refreshToken) {
        if (!refreshToken) {
            console.error('токена нет');
            throw new Error('токена нет')
        }
        const userData = await TokenService.valRefreshTok(refreshToken);
        const dbToken = await TokenService.findToken(refreshToken);
        if (!userData || !dbToken) {
            return {error: 'Не авторизован'};
        }
        const user = await UserModel.findById(dbToken._id)
        const tokens = TokenService.geterateToken({user: user.login})
        await TokenService.saveToken(user.login, tokens.refreshToken);
        return {...tokens, user}
    }
    async getUser() {
        const users = await UserModel.find();
        const bit = users.map((item) => ({login: item.login, first_name: item.first_name, second_name: item.second_name}));
        return bit;
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