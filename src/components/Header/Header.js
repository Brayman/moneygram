import { useNavigate } from "react-router-dom";
import { BiBell } from "react-icons/bi";
import ava from '../../images/ava.jpg'
import style from "./Header.module.css";
function Header(params) {
    const navigate = useNavigate();
    return (
        <header className={style.header} onClick={() => navigate("/profile")}>
            <img className={style.avatar} src={ava} alt='avatar'/>
            my monegram
            <BiBell/>
        </header>
    )
}
export default Header;