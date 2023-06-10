import "./Transaction.css";
import Tag from "../Tag";
import { memo } from "react";
import { Content, Title, Transaction } from "./TransactionPreview.styles";
import Amount from "./Amount";

const TransactionMini = memo(({ _id, type, currency, income, outcome, category, onClick, ...body }) => {
    const date = new Date(body.date).toLocaleString('ru-RU', { month: 'short', day: '2-digit', year: 'numeric' })
    console.log(body);
    return (
        <Transaction to={`/transaction/${_id}`}>
            <Tag tag={category} />
            <Content>
                <div className="content__row transaction__title">
                    <Title>
                        {category}
                    </Title>
                    <Amount {...{ type, currency, income, outcome }} />
                </div>
                <div className="content__row transaction__subtitle">
                    <div>
                        {body.payee}
                    </div>
                    <div>
                        {date}
                    </div>
                </div>
            </Content>
        </Transaction>
    )
})
export default TransactionMini;