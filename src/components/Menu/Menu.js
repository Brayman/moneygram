import { NavLink } from "react-router-dom";
import {
    BiWallet,
    BiTransferAlt,
    BiChart,
    BiMenu,
    BiPlusCircle,
    BiUser
} from "react-icons/bi";
import style from "./Menu.module.css"
function Menu() {
    const navStyle = ({ isActive }) => {
        if (isActive) {
            return `${style.active} ${style.item}`
        } else {
            return style.item
        }
    }
    return (
        <nav className={style.menu}>
            <NavLink to='/accounts' className={navStyle}>
                <BiWallet />
            </NavLink>
            <NavLink to={`/transactions`} className={navStyle}>
                <BiTransferAlt />
            </NavLink>
            <NavLink to='/add' className={navStyle}>
                <BiPlusCircle />
            </NavLink>
            <NavLink to='/analytics' className={navStyle}>
                <BiChart />
            </NavLink>

            <NavLink to='/profile' className={navStyle}>
                <BiUser />
            </NavLink>
        </nav>
    )
}
export default Menu;