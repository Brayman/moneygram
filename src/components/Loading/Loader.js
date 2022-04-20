import { MdAutorenew } from "react-icons/md";
import style from "./Loader.module.css";


function Loader() {
    return (
        <div className={style.around}>
            <MdAutorenew size={50} className={style.loader}/>
        </div>
        
    )
}

export default Loader;