import { useDispatch, useSelector } from "react-redux";
import { compose } from "redux";
import { WithAuthRedirect } from "../hoc/withAuthRedirect";
import * as selectors from "../redux/selectors"
import { transactionsThunk } from "../redux/transactions-reducer";
import TransactionForm from "../components/Forms/TransactionForm/TransactionForm";

const Add = () => {
    const dispatch = useDispatch();
    const props = {
        userid: useSelector(selectors.login),
        date: new Date().getTime(),
        cards: useSelector(selectors.wallets),
        modal: useSelector(selectors.modal),
        card: useSelector(selectors.wallet),
        Action: form => dispatch(transactionsThunk.addTransaction(form))
    }
    return <TransactionForm {...props} />
};

export default compose(WithAuthRedirect)(Add)