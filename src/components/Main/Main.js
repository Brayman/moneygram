import Account from "../Account/Account";
import Transaction from "../Transaction/Transaction";

function Main({props}) {
    return (<div className="home">
            <Account data={props.account} />
            <section className='transactions'>
                {props.transactions.map((item, i) => <Transaction key={i} body={item}/>)}
                <button onClick={() => props.getNextPage(props.curentPage + 1)}>more</button>
            </section>
        </div>)
}
export default Main;