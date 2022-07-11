import * as axios from "axios";

const instance = axios.create({
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
    getTransactions({login, cardid, pageSize, filter, sort}) {
        return instance.get(`transactions?login=${login}&cardid=${cardid}${filter ? `&type=${filter}` : ''}&_limit=${pageSize}&_sort=${sort.field}&_order=${sort.order}`)
            .then(data => data)
    },
    getTransaction: async (id) => {
        const res = await instance.get(`transaction/${id}`)
        return res.data
    },
    getNextTransactions({login, cardid, pageSize, sort, filter, page}) {
        return instance.get(`transactions?login=${login}&cardid=${cardid}${filter ? `&type=${filter}` : ''}&_limit=${pageSize}&_page=${page}&_sort=${sort.field}&_order=${sort.order}`)
            .then(data => data)
    },
    addTransaction: async (data) => {
        return instance.post(`transactions`, data)
    },
    deleteTransaction: async (id) => {
        return await instance.delete(`transactions/${id}`)
    },
    converteReq: async (from, to, amount) => {
        return await converteInstance.get(`exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`)
    },
    updateAccount: async (account) => {
        return await instance.patch(`users/${account.id}`, account)
    },
    editTransaction: async (form) => {
        try {
            const res = await instance.put(`transactions/${form.id}`, form)
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
    addCard(form) {
        return instance.post('cards', form)
    },
    getCards(id) {
        return instance.get(`cards?userid=${id}`).then(data => data.data)
    },
    saveCard: async card => {
        const res = await instance.put(`cards/${card.id}`, card)
        return res
    },
    getUser(id) {
        return instance.get(`users/${id}`).then(data => data.data)
    },
    updateProfile(login, data) {
        console.log(login, data);
        return instance.patch(`profile/${login}`, data).then(data => data)
    },
    SignUp(formData) {
        return instance.post(`/register`, formData).then(data => data.data)
    },
    async Login(formData) {
        try {
            const res = await instance.post(`/login`, formData)
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
    }
}
