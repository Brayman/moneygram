import "./NewMain.css";
import {
    MdFilterList,
    MdKeyboardArrowDown,
    MdShoppingCart
} from "react-icons/md";

function Main(params) {
    return (
        <section>
            <header className="main__header">
                <button className="button button__select">
                    <MdKeyboardArrowDown className="button-select__icon" />
                    <span>Month</span>
                </button>
                <button className="icon-button">
                    <MdFilterList />
                </button>
            </header>
            <main className="main__list">
                <h4 className="transaction__title">
                    Today
                </h4>
                <section className="transaction__item">
                    <div className="transaction__icon">
                        <MdShoppingCart />
                    </div>
                    <div className="transaction__content">
                        <div className="content__title">
                            <div className="content__name">
                                Food
                            </div>
                            <div className="content__money_expense">
                                16 GEL
                            </div>
                        </div>
                        <div className="content__subtitle">
                            <div className="content__payee">
                                Yammy
                            </div>
                            <div className="content__date">
                                03/06/22
                            </div>
                        </div>
                    </div>
                </section>
                <section className="transaction__item">
                    <div className="transaction__icon">
                        <MdShoppingCart />
                    </div>
                    <div className="transaction__content">
                        <div className="content__title">
                            <div className="content__name">
                                Food
                            </div>
                            <div className="content__money">
                                16 GEL
                            </div>
                        </div>
                        <div className="content__subtitle">
                            <div className="content__payee">
                                Yammy
                            </div>
                            <div className="content__date">
                                03/06/22
                            </div>
                        </div>
                    </div>
                </section>
                <section className="transaction__item">
                    <div className="transaction__icon">
                        <MdShoppingCart />
                    </div>
                    <div className="transaction__content">
                        <div className="content__title">
                            <div className="content__name">
                                Food
                            </div>
                            <div className="content__money">
                                16 GEL
                            </div>
                        </div>
                        <div className="content__subtitle">
                            <div className="content__payee">
                                Yammy
                            </div>
                            <div className="content__date">
                                03/06/22
                            </div>
                        </div>
                    </div>
                </section>
                <section className="transaction__item">
                    <div className="transaction__icon">
                        <MdShoppingCart />
                    </div>
                    <div className="transaction__content">
                        <div className="content__title">
                            <div className="content__name">
                                Food
                            </div>
                            <div className="content__money">
                                16 GEL
                            </div>
                        </div>
                        <div className="content__subtitle">
                            <div className="content__payee">
                                Yammy
                            </div>
                            <div className="content__date">
                                03/06/22
                            </div>
                        </div>
                    </div>
                </section>
                <h4 className="transaction__title">
                    Yesterday
                </h4>
                <section className="transaction__item">
                    <div className="transaction__icon">
                        <MdShoppingCart />
                    </div>
                    <div className="transaction__content">
                        <div className="content__title">
                            <div className="content__name">
                                Food
                            </div>
                            <div className="content__money">
                                16 GEL
                            </div>
                        </div>
                        <div className="content__subtitle">
                            <div className="content__payee">
                                Yammy
                            </div>
                            <div className="content__date">
                                03/06/22
                            </div>
                        </div>
                    </div>
                </section>
                <section className="transaction__item">
                    <div className="transaction__icon">
                        <MdShoppingCart />
                    </div>
                    <div className="transaction__content">
                        <div className="content__title">
                            <div className="content__name">
                                Food
                            </div>
                            <div className="content__money">
                                16 GEL
                            </div>
                        </div>
                        <div className="content__subtitle">
                            <div className="content__payee">
                                Yammy
                            </div>
                            <div className="content__date">
                                03/06/22
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </section>
    )
}
export default Main