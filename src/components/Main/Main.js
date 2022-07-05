import Loader from "../common/Loader/Loader";
import TransactionMini from "../Transaction/TransactionPreview";
import {
    MdFilterList,
    MdKeyboardArrowDown,
    MdKeyboardArrowRight
} from "react-icons/md";
import Filter from "./Filter/FilterContainer";
import React, { useState } from "react";
import { Button, IconButton } from "../common/Button/Buttons";
import "./Main.css"
function Main({ props }) {
    const [filter, setFilter] = useState(true)
    return (
        <section className="page transactions">
            <header className="transactions__header">
                <button className="filter-btn">
                    <MdKeyboardArrowDown className="filter-btn__icon" />
                    Month
                </button>
                <IconButton
                    icon={MdFilterList}
                    className="icon-btn"
                    onClick={() => setFilter(prev => !prev)}
                />
            </header>
            <button className="info-btn transactions__report">
                See your financial report
                <MdKeyboardArrowRight className="info-btn__icon" />
            </button>
            <section className="day-section transactions__item">
                <header className="day-section__header">
                    Today
                </header>
                {!props.isLoading ? props.transactions.map((item, i) => {
                    return (<TransactionMini
                        key={item.id}
                        onClick={() => {
                            props.openTransaction(item);
                        }}
                        body={item}
                    />)
                }) : <Loader />}
            </section>
            {
                props.maxPage !== props.curentPage ?
                    <Button
                        className="transactions__button"
                        disabled={props.moreTransLoad}
                        onClick={() => props.getNextPage(props.page + 1)}
                    >
                        more
                    </Button> :
                    null
            }
            <Filter hide={filter} showFilter={() => setFilter(!filter)} />
        </section>
    )

}
export default Main;