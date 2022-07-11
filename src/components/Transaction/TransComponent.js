import { useSelector, useDispatch} from "react-redux";
import { compose } from "redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import Transaction from "./Transaction";
import { modal, transaction } from "../../redux/selectors";
import { withModalAlert } from "../../hoc/withModalAlert";
import { WithAuthRedirect } from "../../hoc/withAuthRedirect";
import { transactionsThunk } from "../../redux/transactions-reducer";
import { transactionThunks } from "../../redux/transaction-reducer";
import Loader from "../common/Loader/Loader";
const TransContainer = () => {
    const dispatch = useDispatch()
    const params = useParams()
    useEffect(() => {
        dispatch(transactionThunks.getTransaction(params.id))
    },[params])
    
    const props = {
        modal: useSelector(modal),
        transaction: useSelector(transaction),
        del: (id, cardid, cost, type) => dispatch(transactionsThunk.deleteTransaction(id, cardid, cost, type))
    }
    if (props.transaction === null) {
        return <Loader/>
    } 
    return (
        <Transaction {...props} />
    )

}

export default compose(WithAuthRedirect, withModalAlert)(TransContainer)