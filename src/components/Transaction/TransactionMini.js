import style from "./Transaction.module.css"
import Tag from "../Tag";
import "../NewMain.css";
import { Segment } from "semantic-ui-react";
import { memo } from "react";
const TransactionMini = memo(({ body, onClick }) => {
    const date = new Date(body.date).toLocaleString('ru-RU', { month: 'short', day: '2-digit', year: 'numeric' })
    return (
        <section
        key={body.id}
        className="transaction__item"
        onClick={onClick}>
            <Tag tag={body.tag} />
            <div className="transaction__content">
                <div className="content__title">
                    <div className="content__name">
                        {body.tag}
                    </div>
                    <div className="content__money">
                        {body.cost} GEL
                    </div>
                </div>
                <div className="content__subtitle">
                    <div className="content__payee">
                        {body.payee}
                    </div>
                    <div className="content__date">
                        {date}
                    </div>
                </div>
            </div>
        </section>
    )
    
})
export default TransactionMini;