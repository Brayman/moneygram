import Tag from "../Tag";
import "./Transaction.css";
import { memo } from "react";
const TransactionMini = memo(({ body, onClick }) => {
    const date = new Date(body.date).toLocaleString('ru-RU', { month: 'short', day: '2-digit', year: 'numeric' })
    return (
        <section key={body.id} className="transaction" onClick={() => onClick()}>
            <Tag tag={body.tag} />
            <div className="transaction__content">
                <div className="content__row transaction__title">
                    <div>
                        {body.tag}
                    </div>
                    <div className={`cost cost_${body.type || 'expense'}`}>
                        {`${body.type === 'expense'? '-' : '+'} ${body.cost}  ${body.currency || ''}`}
                    </div>
                </div>
                <div className="content__row transaction__subtitle">
                    <div>
                        {body.payee}
                    </div>
                    <div>
                        {date}
                    </div>
                </div>
            </div>
        </section>
    )

})
export default TransactionMini;