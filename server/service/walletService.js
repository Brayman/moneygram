const Wallet = require("../models/wallets")

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
            if (wallets.length === 0) {
                throw   "you not have wallets"
            }
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
            const wallet = await Wallet.findByIdAndDelete(id)
            return { status: 'ok', message: 'delete item success' }
        } catch (error) {
            return { status: 'error', message: error.json() }
        }
    }
    async addItem(walletid, expense) {
        try {
            const wallet = await Wallet.findById(walletid)
            wallet.balance += expense
            const updatedWallet = await Wallet.findByIdAndUpdate(walletid, wallet, {new: true})
            return wallet
        } catch (error) {
            console.log(error);
            return { status: 'error', message: error }
        }
    }
}

module.exports = new walletService();