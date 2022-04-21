import * as axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5000/'
})
export const API = {
    getTransactions(pageSize) {
        return instance.get(`transactions?_limit=${pageSize}`)
        .then(data => data)
    },
    getNextTransactions(pageSize, page) {
        return instance.get(`transactions?_limit=${pageSize}&_page=${page}`)
        .then(data => data)
    },
    addTransaction(data) {
        return instance.post(`transactions`,{data})
    },
    getCards() {
        return instance.get("cards").then(data => data.data)
    },
    getUser(login) {
        return instance.get(`users?login=${login}`).then(data => data.data)
    },
    updateProfile(login, data) {
        console.log(login, data);
        return instance.patch(`profile/${login}`,data).then(data => data)
    }
}

