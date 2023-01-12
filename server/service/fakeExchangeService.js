const toDecimal = require("../utils/toDecimal")

class fakeExchangeService {
    currences = {
        USD: {
            BYN: 2.60,
            EUR: 0.99,
            GEL: 2.84,
        },
        BYN: {
            USD: 0.38,
            EUR: 0.38,
            GEL: 0.84,
        },
        EUR: {
            USD: 1.01,
            BYN: 2.62,
            GEL: 2.84,
        },
        GEL: {
            USD: 0.35,
            BYN: 1.18,
            EUR: 0.35,
        }
    }
    lastUpdate = 0
    constructor() {
        this.update()
        this.lastUpdate = new Date().getTime()
    }
    async update() {
        const URL = process.env.ASTATS_URL
        const resUsd = await fetch(`${URL}exchange?amount=1&from=USD`)
        const resByn = await fetch(`${URL}exchange?amount=1&from=BYN`)
        const usd = await resByn.json()
        const byn = await resUsd.json()
        this.currences['USD']['BYN'] = Number.parseFloat(byn.byn)
        this.currences['BYN']['USD'] = Number.parseFloat(usd.usd)
    }
    changeTo(from, to, amount) {
        const currentTime = new Date().getTime()
        if ((currentTime - this.lastUpdate) > 17000000 ) {
            this.update()
            console.log('update currences');
        }
        if (from === to) {
            return amount
        }
       
        return toDecimal(amount * this.currences[from][to])
    }
}

module.exports = new fakeExchangeService()