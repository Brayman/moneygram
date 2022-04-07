import style from './Account.module.css';
function Account() {
    return (
        <section className={style.account}>
            <div className={style.balance_card}>
                account balance:
                <div className={style.balance}>$336 </div>
            </div>
        
        <div className={style.status}>
            spent today $15
        </div>
        <div className={`${style.active} ${style.empty}`}></div>
      </section>
    )
    
}
export default Account;