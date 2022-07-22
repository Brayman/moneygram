module.exports = class userObject {
    id
    login
    email
    balance
    constructor(model) {
        this.id = model._id;
        this.login = model.login;
        this.email = model.email;
        this.balance = model.balance
    }
}