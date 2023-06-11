import { useDispatch, useSelector } from "react-redux";
import { compose } from "redux";
import { WithAuthRedirect } from "../hoc/withAuthRedirect";
import * as selectors from "../redux/selectors"
import { transactionsThunk } from "../redux/transactions-reducer";
import TransactionForm from "../components/Forms/TransactionForm/TransactionForm";

const Edit = () => {
    const dispatch = useDispatch();
    const transaction = useSelector(selectors.transaction)

    const props = {
        transaction: transaction,
        date: new Date(transaction.date).getTime(),
        userid: useSelector(selectors.login),
        card: transaction.cardid,
        cards: useSelector(selectors.wallets),
        modal: useSelector(selectors.modal),
        Action: form => dispatch(transactionsThunk.editTrans(form))
    }

    return <TransactionForm {...props} />
};

export default compose(WithAuthRedirect)(Edit)