import style from "./Transaction.module.css"
import Tag from "../Tag";
function Transaction({body}) {
    return (
        <section className={style.transaction}>
          <Tag tag={body.tag}/>
            <div className={style.body}>
                <div className={style.main}>
                    <div>{body.tag}</div>
                    - ${body.cost}
               </div>
               <div className={style.second}>
                    <div>idificator</div>
                    <div>07/04/22</div>
               </div>
                
            </div>
           
            
        </section>
    )
}
export default Transaction;