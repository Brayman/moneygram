import React from "react";
import style from "./Cards.module.css";
import Account from "../Account/Account";
function Cards(props) {
    return (
        <div className={style.card_section}>
            <Account key={props.card.id} data={props.card}/>
        </div>
    )
}
export default Cards;