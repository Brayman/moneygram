import {
    MdDelete
} from "react-icons/md";
import "./Trans.css"
import { Navigation } from "../common/Navigation/Navigation";
import { useNavigate } from "react-router-dom";
import { Button } from "../common/Button/Buttons";
function Transaction({ transaction, del }) {
    const navigate = useNavigate();
    const { id, tag, cost, date, payee, currency = 'GEL', type = 'expence', cardid, comment = "no comments" } = transaction
    return (
        <section className="tr-full">
            <header className={`tr-full__header header_${type}`}>
                <Navigation className="header__nav" title={'Detail Transaction'}>
                    <button className="nav__button" onClick={() => del(id, cardid, cost, type)}>
                        <MdDelete />
                    </button>
                </Navigation>
                <h1 className="header__title">
                    {`${currency} ${cost}`}
                </h1>
                <div className="header__subtitle">
                    {payee}
                </div>
                <div className="header__date">
                    {new Date(date).toLocaleString()}
                </div>
            </header>
            <main className="tr-full__content">
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
                            Category
                        </div>
                        <div className="panel__text">
                            {tag}
                        </div>
                    </div>
                    <div className="panel__col">
                        <div className="panel__title">
                            Wallet
                        </div>
                        <div className="panel__text">
                            main
                        </div>
                    </div>
                </section>
                <section className="tr-full__comment">
                    <h4 className="comment__header">
                        Comment
                    </h4>
                    {comment}
                </section>
                <Button primary onClick={() => navigate(`/transaction/edit/${id}`)}>
                    edit
                </Button>
            </main>       
        </section>
    )
}

export default Transaction