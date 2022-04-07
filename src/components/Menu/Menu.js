import { NavLink } from "react-router-dom";
import { MdHomeFilled, MdPermIdentity, MdEqualizer, MdAddCircle } from "react-icons/md";
import style from "./Menu.module.css"
function Menu(params) {
    const navStyle = ({isActive}) => {
        if (isActive) {
            return `${style.active} ${style.item}`
        } else {
            return style.item
        }
    }
    return (
        <nav className={style.menu}>
            <NavLink to='/' className={navStyle}>
                <MdHomeFilled/>
            </NavLink>
            <NavLink to='/chart' className={navStyle}>
                <MdEqualizer/>
            </NavLink>
            <NavLink to='/profile' className={navStyle}>
                <MdPermIdentity/>
            </NavLink>
            <NavLink to='/add' className={navStyle}>
                <MdAddCircle/>
            </NavLink>
        </nav>
    )
}
export default Menu;