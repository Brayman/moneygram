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
    changeTo(from, to, amount) {
        if (from === to) {
            return amount
        }
        return amount * this.currences[from][to]
    }
}

module.exports = new fakeExchangeService()