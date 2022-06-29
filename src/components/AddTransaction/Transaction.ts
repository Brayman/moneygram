import { v4 as uuidv4 } from 'uuid';

class Transaktion {
    private _id: string = uuidv4();
    private _userid: string | undefined;
    private _date: string | undefined;
    cardid: string;
    currency: string;
    type: string;
    cost: number;
    payee: string;
    tag: string;
    constructor(userid: string, cardid: string, date: string, currency: string, type: string, cost: number, payee: string, tag: string) {
        this.userid = userid;
        this.date = date;
        this.cardid = cardid;
        this.currency = currency;
        this.type = type;
        this.cost = cost;
        this.payee = payee;
        this.tag = tag;
    }
    get id() {
        return this._id
    }
    get userid() {
        return this._userid
    }
    set userid(value) {
        this._userid = value
    }
    get date() {
        return this._date
    }
    set date(value) {
        this._date = value || (new Date().toISOString().substring(0, 10))
    }

    /**
     * get createEmptyTransaction
     */
    public get createEmptyTransaction() {
        return {
            id: this._id,
            userid: this._userid,
            cardid: this.cardid,
            date: this._date,
            currency: this.currency,
            type: this.type,
            cost: this.cost,
            payee: this.payee,
            tag: this.tag
        }
    }
}
export default Transaktion