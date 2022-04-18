import * as axios from "axios";
export const getTransactions = (pageSize, page) => {
    if (page === undefined) {
        return axios.get(`http://localhost:5000/transactions?_limit=${pageSize}`)
    }
    return axios.get(`http://localhost:5000/transactions?_limit=${pageSize}&_page=${page}`)
}
export const getCards = () => {
    return axios.get("http://localhost:5000/cards")
}
