import {
    MdDelete,
    MdKeyboardBackspace
} from "react-icons/md";
import style from "./Transaction.module.css"
import "./Trans.css"
function Transaction({ tag, currency = "GEL", type = "expense", cost, date, payee, comment = "no comment" }) {
    return (
        <section className="tr-full">
            <header className={`tr-full__header header_${type}`}>
                <nav className="header__nav nav">
                    <button className="nav__button">
                        <MdKeyboardBackspace />
                    </button>
                    <h2 className="nav__title">
                        Detail Transaction
                    </h2>
                    <button className="nav__button">
                        <MdDelete />
                    </button>
                </nav>
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
                        <div>
                            {type}
                        </div>
                    </div>
                    <div className="panel__col">
                        <div className="panel__title"> 
                            Category
                        </div>
                        <div>
                            {tag}
                        </div>
                    </div>
                    <div className="panel__col">
                        <div className="panel__title">
                            Wallet
                        </div>
                        <div>
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
                <button className="tr-full__button">
                    edit
                </button>
            </main>
        </section>
    )
}

export default Transaction