import { useNavigate } from "react-router-dom";
import Account from "../Account/Account";
import Loader from "../common/Loader/Loader";
import TransactionMini from "../Transaction/TransactionMini";
import style from './MainPage.module.css';
import {
    MdFilterList,
    MdKeyboardArrowDown,
    MdKeyboardArrowRight,
    MdShoppingCart
} from "react-icons/md";

function Main({ props }) {
    if (!props.isLoading) {
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
                    {props.transactions.map((item, i) => {
                        return (<TransactionMini
                            key={item.id}
                            onClick={() => {
                                props.openTransaction(item);
                            }}
                            body={item}
                        />)
                    })}
                </section>


            </section>
        )
        return (<div className={style.main}>
            <section className='transactions'>

                {
                    props.maxPage !== props.curentPage ?
                        <button
                            disabled={props.moreTransLoad}
                            onClick={() => props.getNextPage(props.page + 1)}
                        >
                            more
                        </button> :
                        null
                }
            </section>
        </div>)
    } else {
        return <Loader />
    }
}
export default Main;