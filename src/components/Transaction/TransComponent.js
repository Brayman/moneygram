import { useSelector, useDispatch} from "react-redux";
import { compose } from "redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import Transaction from "./Transaction";
import { modal, transaction } from "../../redux/selectors";
import { withModalAlert } from "../../hoc/withModalAlert";
import { WithAuthRedirect } from "../../hoc/withAuthRedirect";
import { transactionsThunk } from "../../redux/transactions-reducer";
import Loader from "../common/Loader/Loader";
const TransContainer = () => {
    const dispatch = useDispatch()
    const params = useParams()
    useEffect(() => {
        dispatch(transactionsThunk.getTransaction(params.id))
    },[params, dispatch])
    
    const props = {
        modal: useSelector(modal),
        transaction: useSelector(transaction),
        del: () => dispatch(transactionsThunk.deleteTransaction(params.id))
    }
    if (props.transaction === null) {
        return <Loader/>
    } 
    return (
        <Transaction {...props} />
    )

}

export default compose(WithAuthRedirect, withModalAlert)(TransContainer)