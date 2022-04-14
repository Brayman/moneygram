import { connect } from "react-redux";
import { AddTransactionAction, createChangeAction } from "../../redux/transactions";
import AddForm from "./AddTransaction";
const mapStateToProps = state => {
    return {
        transaction: state.transactions.newTransaktion
    }
}
const mapDispatchToProps = dispatch => {
    return {
        Change: item => dispatch(createChangeAction(item)),
        Add: value => dispatch(AddTransactionAction(value))
    }
}
const AddContainer = connect(mapStateToProps, mapDispatchToProps)(AddForm)
export default AddContainer;