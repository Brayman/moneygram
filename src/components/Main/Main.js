import Account from "../Account/Account";
import Loader from "../common/Loader/Loader";
import Transaction from "../Transaction/Transaction";

function Main({props}) {
    if (!props.isLoading) {
        return (<div className="home">
            <Account data={props.account} />
            <section className='transactions'>
                {props.transactions.map((item, i) => <Transaction key={i} body={item}/>)}
                {
                    props.maxPage !== props.curentPage ?
                    <button disabled={props.moreTransLoad} onClick={()=>props.getNextPage(props.curentPage + 1)}>more</button> :
                    null
                }
                
            </section>
        </div>)
    } else {
        return <Loader/>
    }
    
}
export default Main;