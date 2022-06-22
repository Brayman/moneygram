import Loader from "../common/Loader/Loader";
import TransactionMini from "../Transaction/TransactionPreview";
import {
    MdFilterList,
    MdKeyboardArrowDown,
    MdKeyboardArrowRight
} from "react-icons/md";

function Main({ props }) {
    if (!props.isLoading) {
        return (
            <section className="page transactions">
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
        )
    } else {
        return <Loader />
    }
}
export default Main;