import * as axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5000/'
})
export const API = {
    getTransactions(login, pageSize) {
        return instance.get(`transactions?login=${login}&_limit=${pageSize}`)
        .then(data => data)
    },
    getNextTransactions(login, pageSize, page) {
        return instance.get(`transactions?login=${login}&_limit=${pageSize}&_page=${page}`)
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
    },
    SignUp(formData) {
        return instance.post(`users`, formData).then(data => data.data)
    },
    Login(formData) {
        return instance.post(`login`, formData)
        .then(data => data)
        .catch(error => {return 404})
    }
}

