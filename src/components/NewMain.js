import "./NewMain.css";
import {
    MdFilterList,
    MdKeyboardArrowDown,
    MdKeyboardArrowRight,
    MdShoppingCart
} from "react-icons/md";


import React from 'react'

export const Transaction = () => {
    return (
        <section className="transaction">
            <MdShoppingCart className="transaction__icon" />
            <div className="transaction__content">
                <div className="content__row transaction__title">
                    <div>
                        Shopping
                    </div>
                    <div className="cost cost_expense">
                        -120 $
                    </div>
                </div>
                <div className="content__row transaction__subtitle">
                    <div>
                        Something buying
                    </div>
                    <div>
                        07:30 PM
                    </div>
                </div>
            </div>
        </section>
    )
}

function Main(params) {
    return (
        <section className="transactions">
            <header className="transactions__header">
                <button className="filter-btn">
                    <MdKeyboardArrowDown className="filter-btn__icon" />
                    Month
                </button>
                <button className="icon-btn">
                    <MdFilterList />
                </button>
            </header>
            <button className="info-btn transactions__report">
                See your financial report
                <MdKeyboardArrowRight className="info-btn__icon" />
            </button>
            <section className="day-section transactions__item">
                <header className="day-section__header">
                    Today
                </header>
                <Transaction />
                <Transaction />
                <Transaction />
            </section>
            <section className="day-section transactions__item">
                <header className="day-section__header">
                    Yesterday
                </header>
                <Transaction />
                <Transaction />
            </section>
        </section>
    )
}
export default Main