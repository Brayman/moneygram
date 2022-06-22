import { Component } from "react";
import { connect } from "react-redux";
import Transaction from "./Transaction";
import {modal, transaction } from "../../redux/selectors";
import { withModalAlert } from "../../hoc/withModalAlert";
import { compose } from "redux";
import { WithAuthRedirect } from "../../hoc/withAuthRedirect";
import { actions } from "../../redux/actions/card-actions";
class TransContainer extends Component {
    
    render() {
        return(
            <Transaction {...this.props}/>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        del: (id) => dispatch(actions.deleteTransaction(id)) 
    }        
}
const mapStateToProps = state => {
    return {
        transaction: transaction(state),
        modal: modal(state)
    }        
}
export default compose(WithAuthRedirect,withModalAlert)(connect(mapStateToProps, mapDispatchToProps)(TransContainer))