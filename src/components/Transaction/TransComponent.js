import { useSelector, useDispatch } from "react-redux";
import { compose } from "redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import Transaction from "./Transaction";
import { modal, transaction, wallets } from "../../redux/selectors";
import { withModalAlert } from "../../hoc/withModalAlert";
import { WithAuthRedirect } from "../../hoc/withAuthRedirect";
import { transactionsThunk } from "../../redux/transactions-reducer";
import Loader from "../common/Loader/Loader";



const TransContainer = () => {
    const dispatch = useDispatch()
    const params = useParams()
    useEffect(() => {
        console.log('go');
        dispatch(transactionsThunk.getTransaction(params.id))
    }, [params, dispatch])
    const cards = useSelector(wallets)
    const trans = useSelector(transaction)
    console.log(trans);
    const getWalletsNames = () => {

        if (trans.type === 'transfer') {
            return {
                from: cards.find(wallet => wallet._id === trans.outcomeWallet).name,
                to: cards.find(wallet => wallet._id === trans.incomeWallet).name
            }
        }
    }

    const props = {
        modal: useSelector(modal),
        transaction: {
            ...trans,
        },

        del: () => dispatch(transactionsThunk.deleteTransaction(params.id))
    }
    if (trans === null) {
        return <Loader />
    }
    if (trans) {
        props.transaction = {
            ...trans,
            ...getWalletsNames()
        }
    }
    return (
        <Transaction {...props} />
    )

}

export default compose(WithAuthRedirect, withModalAlert)(TransContainer)