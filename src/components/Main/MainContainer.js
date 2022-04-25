import { Component, useEffect } from "react";
import Main from "./Main";
import { connect } from "react-redux";
import { getTransactionsThunk } from "../../redux/transactions";
import { WithAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

class MainContainer extends Component {
    
    componentDidMount = () => {
        this.props.getTransactionsThunk(this.props.login, this.props.pageSize)
    }
    onPageChanget = page => {
        this.props.getTransactionsThunk(this.props.login, this.props.pageSize, page) 
    } 
    render() {
        const page = Math.ceil(this.props.totalTransCount / this.props.pageSize);
        return <Main props={{...this.props, maxPage: page, getNextPage: this.onPageChanget}}/>
    }
}
const mapStateToProps = state => {
    return {
        login: state.account.login,
        isLoading: state.transactions.isLoading,
        isAuth: state.account.isAuth,
        account: state.account.cards[state.account.selectCard],
        transactions: state.transactions.transactions,
        curentPage: state.transactions.curentPage,
        pageSize: state.transactions.pageSize,
        totalTransCount: state.transactions.totalTransCount,
        moreTransLoad: state.transactions.moreTransLoad,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        getTransactionsThunk: (login, pageSize, page) => dispatch(getTransactionsThunk(login, pageSize, page))
    }
}
export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    WithAuthRedirect
)(MainContainer)