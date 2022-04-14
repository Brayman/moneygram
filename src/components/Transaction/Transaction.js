import style from "./Transaction.module.css"
import Tag from "../Tag";
function Transaction({body}) {
    const date = new Date(body.date).toLocaleString('ru-RU',{month: 'short', day: '2-digit', year:'numeric'})
    return (
        <section className={style.transaction}>
          <Tag tag={body.tag} getTag={tag => console.log(tag)}/>
            <div className={style.body}>
                <div className={style.main}>
                    <div>{body.tag}</div>
                    - ${body.cost}
               </div>
               <div className={style.second}>
                    <div>{body.receiver}</div>
                    <div>{date}</div>
                </div>
            </div>
           
            
        </section>
    )
}
export default Transaction;