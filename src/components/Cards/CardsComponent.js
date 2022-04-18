import React, {Component} from "react";
import * as axios from "axios";
import style from "./Cards.module.css";
import Account from "../Account/Account";
import { getCards } from "../../api/api";


class Cards extends Component {
    componentDidMount = async() => {
        const data = await getCards;
        this.props.setCards(data.data)
    } 
    sendCards = async () => {
        const data = await axios.post("http://localhost:5000/transactions",{
            id: 5,
            cost: 0.01,
            tag: "bus"
        });
        console.log(data);
    }
    render() {
        return (
            <div className={style.card_section}>
                <Account key={this.props.cards[0].id} data={this.props.cards[0]}/>
                <button onClick={()=> console.log('right')}>right</button>
            </div>
        )
    }
}
export default Cards;