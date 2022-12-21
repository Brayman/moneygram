import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5000/'

})
const converteInstance = axios.create({
    baseURL: "https://api.apilayer.com/",
    redirect: 'follow',
    headers: {
        apikey: "SScUf1BlWcB37t0hwMe13MduDxkDXTKs"
    }
})

export const API = {
    getTransactions({ login, cardid, pageSize, filter, sort }) {
        return instance.get(`transactions/${login}?${cardid ? '&cardid=' + cardid : ''}&sort=${sort.field}&order=${sort.order}${filter ? '&type=' + filter : ''}`)
            .then(data => data)
    },
    getTransaction: async (id) => {
        const res = await instance.get(`transaction/${id}`)
        return res.data
    },
    addTransaction: async (newTransaction) => {
        return instance.post(`transaction/${newTransaction.userid}`, newTransaction)
    },
    deleteTransaction: async (id) => {
        return await instance.delete(`transactions/${id}`)
    },
    getWallet: async (id) => {
        const wallet = await instance.get(`wallet/${id}`)
        return wallet
    },
    createWallet: async (walletForm) => {
        const wallet = await instance.post(`wallet`, walletForm)
        return wallet
    },
    getWallets(login) {
        return instance.get(`wallets/${login}`).then(data => data.data)
    },
    editWallet: async (id, newWallet) => {
        const wallet = await instance.patch(`wallet/${id}`, newWallet)
        return wallet
    },
    getBalance: async (login) => {
        const balance = await instance.get(`wallet/balance/${login}`)
        return balance
    },
    getIncome: async (login) => {
        const res = await instance.get(`${login}/income`)
        return res.data
    },
    getExpense: async (login) => {
        const res = await instance.get(`${login}/expense`)
        return res.data
    },
    getBalanceStatistic: async (login) => {
        const stat = await instance.get(`statistic/balance/${login}`)
        return stat.data
    },
    getCategoryStatistic: async (login, filter) => {
        const stat = await instance.get(`statistic/category/${login}${filter ? '?type=' + filter : ''}`)
        return stat.data
    },
    getNextTransactions({ login, cardid, pageSize, sort, filter, page }) {
        return instance.get(`transactions/${login}?${filter ? `&type=${filter}` : ''}&_limit=${pageSize}&_page=${page}&_sort=${sort.field}&_order=${sort.order}`)
            .then(data => data)
    },
    converteReq: async (from, to, amount) => {
        return await converteInstance.get(`exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`)
    },
    updateAccount: async (account) => {
        return await instance.patch(`users/${account.id}`, account)
    },
    editTransaction: async (form) => {
        try {
            const res = await instance.patch(`transaction/${form._id}`, form)
            if (res.status === 200) {
                return {
                    type: 'message',
                    data: res.data,
                    message: 'Transaction has been successfully edited'
                }
            }
        } catch (error) {
            return {
                type: 'error',
                message: 'Edit transaction failed'
            }
        }
    },
    getUser(id) {
        return instance.get(`user/${id}`).then(data => data.data)
    },
    updateProfile(login, data) {
        console.log(login, data);
        return instance.patch(`profile/${login}`, data).then(data => data)
    },
    SignUp: async (formData) => {
        const res = await instance.post(`/signup`, formData).then(data => data.data)
        if (res.status === 200) {
            return res.user
        }
    },
    SignUpGitHub: async (formData) => {
        const res = await instance.get(`signup/github`).then(data => data.data)
        return res
    },
    Login: async (formData) => {
        try {
            const res = await instance.post(`/signin`, formData)
            if (res.status >= 400) {
                return res
            }
            return res
        } catch (error) {
            const res = error.toJSON()
            if (res.status >= 400) {
                return {
                    status: res.status,
                    message: "login or password is wrong"
                }
            }
            return {
                status: 500,
                message: res.message
            }
        }
    },
    Logout: async () => {
        await instance.post('/logout')
    },
    checkAuth: async () => {
        try {
            const res = await axios.get('http://localhost:5000/autho', {
                withCredentials: true,
            })
            if (res.status === 200) {
                return res.data
            }
        } catch (error) {
            throw new Error(error)
        }


    }
}
