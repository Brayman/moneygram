import style from './Account.module.css';
import { MdAdd } from "react-icons/md";
import { NavLink } from 'react-router-dom';
export function CreateAccount(params) {
    return (
        <div className={`${style.empty} ${style.account}`}>
            create card
            <NavLink to='/card-create'>
                <MdAdd size={40}/>
            </NavLink>
        </div>
    )
}
function Account({card}) {
    if (!card) {
       return null
    } 
    return (
        <section className={style.account}>
            <div className={style.balance_card}>
                account balance:
                <div className={style.balance}>${card.balance}</div>
            </div>
        
        <div className={style.status}>
            spent today $
        </div>
        <div className={`${style.active} ${style.empty}`}></div>
      </section>
    )
    
}
export default Account;