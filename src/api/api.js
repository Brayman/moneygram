import * as axios from "axios";
import { orderBy } from "lodash";

const instance = axios.create({
    baseURL: 'http://localhost:5000/'
})
export const API = {
    getTransactions(login, cardid, pageSize) {
        return instance.get(`transactions?login=${login}&cardid=${cardid}&_limit=${pageSize}&_sort=date&_order=desc`)
            .then(data => data)
    },
    getNextTransactions(login, cardid, pageSize, page) {
        return instance.get(`transactions?login=${login}&cardid=${cardid}&_limit=${pageSize}&_page=${page}&_sort=date&_order=desc`)
            .then(data => data)
    },
    addTransaction: async (data) => {
        return instance.post(`transactions`, data)
    },
    editTransaction: async (form) => {
        try {
            const res = await instance.put(`transactions/${form.id}`, form)
            console.log(res.status);
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
    Login(formData) {
        return instance.post(`login`, { login: formData.login, pass: formData.password })
            .then(data => data)
            .catch(error => { return 404 })
    },
    Test() {
        return instance.get(`transactions?login=brayman&cardid=2114b669-3ac9-4754-95af-b02cd3f7321d`)
            .then(data => console.log(orderBy(data.data, 'date', 'asc')))

    }
}
