import { connect } from "react-redux";
import { WithAuthRedirect } from "../../hoc/withAuthRedirect";
import { AddTransactionAction, createChangeAction } from "../../redux/transactions";

import AddForm from "./AddTransaction";
const mapStateToProps = state => {
    return {
        transaction: state.transactions.newTrans
    }
}
const mapDispatchToProps = dispatch => {
    return {
        Change: item => dispatch(createChangeAction(item)),
        Add: value => dispatch(AddTransactionAction(value))
    }
}
const AddContainer = connect(mapStateToProps, mapDispatchToProps)(WithAuthRedirect(AddForm))
export default AddContainer;