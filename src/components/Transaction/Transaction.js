import style from "./Transaction.module.css"
import Tag from "../Tag";
function Transaction({body}) {
    return (
        <section className={style.transaction}>
          <Tag tag={body.tag}/>
            <div>{body.tag}</div>
            - ${body.cost}
        </section>
    )
}
export default Transaction;