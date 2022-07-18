function Account({balance}) {
    return (
        <section className="accounts__balance">
            <div className="balance__subtitle">
                Account balance
            </div>
            <div className="balance__title">
                USD {balance}
            </div>
        </section>
    )
    
}
export default Account;