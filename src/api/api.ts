import axios from "axios";
import {
    getTransactionsType,
    getNextTransactions
} from "../types";

const instance = axios.create({
    baseURL: 'http://localhost:5000/'
})



export const API = {
    getTransactions({ login, cardid, pageSize, filter, sort }: getTransactionsType) {
        return instance.get(`transactions?login=${login}&cardid=${cardid}${filter ? `&type=${filter}` : ''}&_limit=${pageSize}&_sort=${sort.field}&_order=${sort.order}`)
            .then((data) => data)
    },
    getNextTransactions({ login, cardid, pageSize, sort, filter, page }: getNextTransactions) {
        return instance.get(`transactions?login=${login}&cardid=${cardid}${filter ? `&type=${filter}` : ''}&_limit=${pageSize}&_page=${page}&_sort=${sort.field}&_order=${sort.order}`)
            .then((data) => data)
    },
    addTransaction: async (data: any) => {
        return instance.post(`transactions`, data)
    },
    deleteTransaction: async (id: string) => {
        return await instance.delete(`transactions/${id}`)
    },
    editTransaction: async (form: any) => {
        try {
            const res = await instance.put(`transactions/${form.id}`, form)
            if (res.status === 200) {
                return {
                    type: 'message',
                    data: res.data,
                    message: 'Transaction has been successfully edited'
                }
            }
            return {
                type: 'error',
                message: 'Edit transaction failed'
            }
        } catch (error) {
            return {
                type: 'error',
                message: 'Edit transaction failed'
            }
        }
    },
    addCard(form: any) {
        return instance.post('cards', form)
    },
    getCards(id: string) {
        return instance.get(`cards?userid=${id}`).then(data => data.data)
    },
    saveCard: async (card: any) => {
        const res = await instance.put(`cards/${card.id}`, card)
        return res
    },
    getUser(id: string) {
        return instance.get(`users/${id}`).then(data => data.data)
    },
    updateProfile(login: string, data: any) {
        console.log(login, data);
        return instance.patch(`profile/${login}`, data).then(data => data)
    },
    SignUp(formData: any) {
        return instance.post(`users`, formData).then(data => data.data)
    },
    async Login(formData: any) {
        try {
            const res = await instance.post(`login`, { login: formData.login, pass: formData.password })
            if (res.status >= 400) {
                return res
            }
            return res
        } catch (error: any) {
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
