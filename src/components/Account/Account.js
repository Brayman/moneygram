function Account({balance, currency}) {
    return (
        <section className="accounts__balance">
            <div className="balance__subtitle">
                Account balance
            </div>
            <div className="balance__title">
                {currency} {balance}
            </div>
        </section>
    )
    
}
export default Account;