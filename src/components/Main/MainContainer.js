import { Component, useEffect } from "react";
import Account from "../Account/Account";
import Transaction from "../Transaction/Transaction";
import * as axios from "axios";
import Main from "./Main";
import { connect } from "react-redux";
import { getTransactionsAC, setCurrentPageAC, setTransactionsAC } from "../../redux/transactions";
import { getTransactions } from "../../api/api";

// function Main({accountData, transactions, setTransaktions}) {
//     useEffect(() => {
//         console.log('go');
//             axios.get("http://localhost:5000/transactions?_limit=6")
//             .then(data => setTransaktions(data.data))
//     },[])
//     return (
//         <div className="home">
//             <Account data={accountData} />
//             <section className='transactions'>
//                 {transactions.map((item, i) => <Transaction key={i} body={item}/>)}
//             </section>
//         </div>
//     )
// }

class MainContainer extends Component {
    
    componentDidMount = () => {
        getTransactions(this.props.pageSize).then(data => this.props.setTransactions(data.data))
    }
    onPageChanget = page => {
        this.props.setCurrentPage(page)
        getTransactions(this.props.pageSize, page).then(data => this.props.getMoreTrans(data.data))
    }
    render() {
        let page = this.props.totalTransCount / this.props.pageSize;
        return <Main props={{...this.props, getNextPage: this.onPageChanget}}/>
        
    }
}
const mapStateToProps = state => {
    return {
        account: state.account,
        transactions: state.transactions.transactions,
        curentPage: state.transactions.curentPage,
        pageSize: state.transactions.pageSize,
        totalTransCount: state.transactions.totalTransCount
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setCurrentPage: page => dispatch(setCurrentPageAC(page)),
        setTransactions: data => dispatch(setTransactionsAC(data)),
        getMoreTrans: data => dispatch(getTransactionsAC(data))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(MainContainer);