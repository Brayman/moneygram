import * as axios from "axios";
import { orderBy } from "lodash";

const instance = axios.create({
    baseURL: 'http://localhost:5000/'
})
export const API = {
    getTransactions({login, cardid, pageSize, filter, sort}) {
        return instance.get(`transactions?login=${login}&cardid=${cardid}${filter ? `&type=${filter}` : ''}&_limit=${pageSize}&_sort=${sort.field}&_order=${sort.order}`)
            .then(data => data)
    },
    getNextTransactions({login, cardid, pageSize, sort, filter, page}) {
        return instance.get(`transactions?login=${login}&cardid=${cardid}${filter ? `&type=${filter}` : ''}&_limit=${pageSize}&_page=${page}&_sort=${sort.field}&_order=${sort.order}`)
            .then(data => data)
    },
    addTransaction: async (data) => {
        return instance.post(`transactions`, data)
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
    updateCard(card) {
        return instance.put(`cards/${card.id}`, card)
            .then(res => res)
    },
    getUser(id) {
        return instance.get(`users/${id}`).then(data => data.data)
    },
    updateProfile(login, data) {
        console.log(login, data);
        return instance.patch(`profile/${login}`, data).then(data => data)
    },
    SignUp(formData) {
        return instance.post(`users`, formData).then(data => data.data)
    },
    async Login(formData) {
        try {
            const res = await instance.post(`login`, { login: formData.login, pass: formData.password })
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
    Test() {
        return instance.get(`transactions?login=brayman&cardid=2114b669-3ac9-4754-95af-b02cd3f7321d`)
            .then(data => console.log(orderBy(data.data, 'date', 'asc')))

    }
}
