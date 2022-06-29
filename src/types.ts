export type getTransactionsType = {
    login: string,
    cardid: string,
    pageSize: number,
    filter: string,
    sort: any
}
export type getNextTransactions = {
    login: string,
    cardid: string,
    pageSize: number,
    filter: string,
    sort: any,
    page: number | undefined
} 
export type sortTypes = {
    order: "asc" | "desc",
    field: string
}

export type reduxActionType = {
    type: string,
    payload: any
}
type Modal = {
    type: string,
    message: string,
    data: object | undefined
}
