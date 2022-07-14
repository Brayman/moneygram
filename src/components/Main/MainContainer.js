import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WithAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { transactionsThunk } from "../../redux/transactions-reducer";
import * as selectors from "../../redux/selectors";
import { useParams, useNavigate } from "react-router-dom";
import { withModalAlert } from "../../hoc/withModalAlert";
import Transactions from "../../pages/Transactions";

function MainContainerWithEffect({ login }) {
    const totalTransCount = useSelector(selectors.totalTransCount)
    const transactions = useSelector(selectors.transactions);
    const page = useSelector(selectors.curentPage);
    const pageSize = useSelector(selectors.pageSize);
    const isLoading = useSelector(selectors.isLoading)
    const sort = useSelector(selectors.sort)
    const filter = useSelector(selectors.filter)
    const { cardid } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getNextPage = (page) => dispatch(transactionsThunk.getTransactions({login, cardid, pageSize,filter, sort, page}));
    useEffect(() => {
        dispatch(transactionsThunk.getTransactions({login, cardid, pageSize, sort, filter}))
    }, [login, cardid, pageSize, sort, filter, dispatch])
    const openTransaction = (transaction) => {
        navigate(`/transaction/${transaction.id}`)
    }
    const maxPage = Math.ceil(totalTransCount / pageSize);
    return <Transactions props={{ isLoading, transactions, login, cardid, page, pageSize, maxPage, getNextPage, openTransaction }} />
}
export default compose(WithAuthRedirect, withModalAlert)(MainContainerWithEffect)