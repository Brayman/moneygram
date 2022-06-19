import React from "react";
import style from "./Cards.module.css";
import Account, { CreateAccount } from "../Account/Account";
import { BiChevronRight, BiChevronLeft, BiPlus } from "react-icons/bi";

function ArrowButton({props, setNextCard, setPervCard}) {
    switch (props) {
        case 'left':
            return (
                <button className="left_button" onClick={() => setPervCard()}>
                    <BiChevronLeft size={30}/>
                </button>
            )
        case 'right':
            return (
                <button className="right_button"  onClick={() => setNextCard()}>
                    <BiChevronRight size={30}/>
                </button>
            )
        default:
            return <noscript/>
    }
}
function Cards({selectCard, setPervCard, setNextCard, cards}) {
    return (
        <section className='cards'>
            {selectCard !== 0 ?
            <ArrowButton props='left' setPervCard={setPervCard}/> :
            null}
            {selectCard !== cards.length ?
            <Account card={cards[selectCard]}/> :
            <CreateAccount/>}
            {selectCard < cards.length ?
            <ArrowButton props='right' setNextCard={setNextCard}/> : null}
        </section>
        // <div className={style.card_section}>
        //     <Account card={props.card}/>
        // </div>
    )
}
export default Cards;