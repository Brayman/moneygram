import Account from "../Account/Account";
import Transaction from "../Transaction/Transaction";

function Main({accountData, transactions}) {
        return (
        <div className="home">
            <Account data={accountData} />
            <section className='transactions'>
                {transactions.map((item, i) => <Transaction key={i} body={item}/>)}
            </section>
        </div>
    )
}
export default Main;