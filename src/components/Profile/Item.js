import { BiChevronRight } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import style from "./Settings.module.css"
function Item({desc, header, item, children}) {
    const navigate = useNavigate();
    return (
    <div className={style.item} onClick={() => navigate(item)}>
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