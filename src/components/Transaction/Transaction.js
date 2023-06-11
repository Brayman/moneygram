import {
    MdDelete
} from "react-icons/md";
import "./Trans.css"
import { Navigation } from "../common/Navigation/Navigation";
import { useNavigate } from "react-router-dom";
import { Button } from "../common/Button/Buttons";
import { Title, Header, DateString } from "./Transaction.styles"
import CreateClasssName from "../../utils/bemClassCreate";

const createCN = CreateClasssName()


const Panel = ({ type, category, from, to }) => {
    return (
        <section className="tr-full__panel panel">
            <div className="panel__col">
                <div className="panel__title">
                    Type
                </div>
                <div className="panel__text">
                    {type}
                </div>
            </div>
            <div className="panel__col">
                <div className="panel__title">
                    {type === 'transfer' ? 'From' : 'Category'}
                </div>
                <div className="panel__text">
                    {type === 'transfer' ? from : category}
                </div>
            </div>
            <div className="panel__col">
                <div className="panel__title">
                    {type === 'transfer' ? 'To' : 'Wallet'}
                </div>
                <div className="panel__text">
                    {type === 'transfer' ? to : 'Wallet'}
                </div>
            </div>
        </section>
    )
}

function Transaction({ transaction, cards, del }) {
    const navigate = useNavigate();
    const {
        _id,
        cost,
        date,
        payee,
        outcomeCurrency,
        incomeCurrency,
        income,
        outcome,
        cardid,
        type = 'expence',
        comment = "no comments"
    } = transaction
    const amount = () => {
        const currency = type === 'expence' || 'transfer' ? outcomeCurrency : incomeCurrency
        if (currency === 'USD') {
            return `$ ${outcome}`
        }
        return `${outcome} ${currency}`
    }
    console.log(transaction);
    return (
        <section className="tr-full">
            <Header type={type}>
                <Navigation className={createCN("header", "nav", { [type]: true })} title={'Detail Transaction'}>
                    <button className={createCN("nav", "button")} onClick={() => del(cardid, cost, type)}>
                        <MdDelete />
                    </button>
                </Navigation>
                <Title>
                    {amount()}
                </Title>
                <div className="header__subtitle">
                    {payee}
                </div>
                <DateString>
                    {new Date(date).toLocaleString()}
                </DateString>
            </Header>
            <main className="tr-full__content">
                <Panel {...transaction} />
                <section className="tr-full__comment">
                    <h4 className="comment__header">
                        Comment
                    </h4>
                    {comment}
                </section>
                <Button primary onClick={() => navigate(`/transaction/edit/${_id}`)}>
                    edit
                </Button>
            </main>
        </section>
    )
}

export default Transaction