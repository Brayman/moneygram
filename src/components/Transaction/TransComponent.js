import { useSelector, useDispatch} from "react-redux";
import Transaction from "./Transaction";
import { modal, transaction } from "../../redux/selectors";
import { withModalAlert } from "../../hoc/withModalAlert";
import { compose } from "redux";
import { WithAuthRedirect } from "../../hoc/withAuthRedirect";
import { transactionsThunk } from "../../redux/transactions-reducer";
const TransContainer = () => {
    const dispatch = useDispatch()
    const props = {
        modal: useSelector(modal),
        transaction: useSelector(transaction),
        del: (id, cardid, cost, type) => dispatch(transactionsThunk.deleteTransaction(id, cardid, cost, type))
    }

    return (
        <Transaction {...props} />
    )

}

export default compose(WithAuthRedirect, withModalAlert)(TransContainer)