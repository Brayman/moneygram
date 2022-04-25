import { connect } from "react-redux";
import { WithAuthRedirect } from "../../hoc/withAuthRedirect";
import { AddTransactionAction, createChangeAction } from "../../redux/transactions";

import AddForm from "./AddTransaction";
const mapStateToProps = state => {
    return {
        transaction: state.transactions.newTrans,
        userid: state.account.login
    }
}
const mapDispatchToProps = dispatch => {
    return {
        Change: item => dispatch(createChangeAction(item)),
        Add: (id, value) => dispatch(AddTransactionAction(id, value))
    }
}
const AddContainer = connect(mapStateToProps, mapDispatchToProps)(WithAuthRedirect(AddForm))
export default AddContainer;