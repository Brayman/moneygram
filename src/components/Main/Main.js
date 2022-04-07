import Account from "../Account/Account";
import Transaction from "../Transaction/Transaction";

function Main() {
    return (
        <div>
            <Account/>
            <section className='transactions'>
                <Transaction cost={10} tag="shop"/>
                <Transaction cost={1} tag="bus"/>
                <Transaction cost={4} tag="shop"/>
            </section>
        </div>
    )
}
export default Main;