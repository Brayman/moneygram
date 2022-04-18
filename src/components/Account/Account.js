import style from './Account.module.css';
function Account({data}) {
    return (
        <section className={style.account}>
            <div className={style.balance_card}>
                account balance:
                <div className={style.balance}>${data.balance}</div>
            </div>
        
        <div className={style.status}>
            spent today $
        </div>
        <div className={`${style.active} ${style.empty}`}></div>
      </section>
    )
    
}
export default Account;