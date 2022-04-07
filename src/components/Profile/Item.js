import { BiChevronRight } from "react-icons/bi";
import style from "../Profile/Settings.module.css"
function Item({desc, header, type, children}) {
    return (
    <div className={style.item}>
        <div className={style.icon}>
            {children}
        </div>
        <div className={style.content}>
            <div className={style.header}>
                {header}
            </div>
            {desc}
        </div>
        <BiChevronRight className={style.button} size={30}/>
    </div>
    )
}
export default Item;