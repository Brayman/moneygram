import style from "./Transaction.module.css"
import Tag from "../Tag";
function Transaction({cost, tag}) {
    return (
        <section className={style.transaction}>
          <Tag tag={tag}/>
            <div>{tag}</div>
            - ${cost}
        </section>
    )
}
export default Transaction;