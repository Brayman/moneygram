const Wallet = require("../models/wallets")
const fakeExchangeService = require("./fakeExchangeService")

class walletService {
    async create(userid, name, balance, currency) {
        try {
            const wallet = await new Wallet({ userid, name, balance, currency })
            wallet.save()
            return wallet
        } catch (error) {
            return { status: 'error', message: error.json() }
        }
    }
    async getOne(id) {
        try {
            const wallet = await Wallet.findById(id)
            return wallet
        } catch (error) {
            return { status: 'error', message: error.json() }
        }
    }
    async getMany(userid) {
        try {
            const wallets = await Wallet.find({ userid })
            return wallets
        } catch (error) {
            return { status: 'error', message: error }
        }
    }
    async update(id, updateData) {
        try {
            const wallet = await Wallet.findByIdAndUpdate(id, updateData, { new: true })
            return wallet
        } catch (error) {
            return { status: 'error', message: error.json() }
        }
    }
    async delete(id) {
        try {
            await Wallet.findByIdAndDelete(id)
            return { status: 'ok', message: 'delete item success' }
        } catch (error) {
            return { status: 'error', message: error.json() }
        }
    }
    async changeBalance(walletid, amount ) {
        try {
            const wallet = await this.getOne(walletid)
            wallet.balance += amount
            const updatedWallet = await this.update(walletid, wallet, { new: true })
            return updatedWallet
        } catch (error) {
            console.log(error);
            return { status: 'error', message: error }
        }
    }
    async getBalance(userid) {
        const wallets = await this.getMany(userid)
        const balance = wallets.reduce((balance, wallet) => {
            const walletBalance = fakeExchangeService.changeTo(wallet.currency, 'USD', wallet.balance)
            return balance += walletBalance
        }, 0)
        return balance
    }
}

module.exports = new walletService();