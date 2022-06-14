import { Component } from "react";
import { connect } from "react-redux";
import Transaction from "./Transaction";
import {modal, transaction } from "../../redux/selectors";
class TransContainer extends Component {
    render() {
        return(
            <Transaction {...this.props}/>
        )
    }
}
const mapStateToProps = state => {
    return {
        transaction: transaction(state),
        modal: modal(state)
    }        
}
export default connect(mapStateToProps)(TransContainer)