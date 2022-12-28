declare interface walletServiceInterface {
    create(userid: string, name: string, balance: number, currency: string)
    getOne(id: string)
    getMany(userid: string)
    update(id: string, updateData: any)
    delete(userid: string)
    changeBalance(userid: string)
    getBalance(userid: string)
}

