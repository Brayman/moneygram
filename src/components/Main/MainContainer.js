import { useEffect } from "react";
import Main from "./Main";
import { useDispatch, useSelector } from "react-redux";
import { WithAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { cardThunks } from "../../redux/actions/card-actions";
import Loader from "../common/Loader/Loader";
import * as selectors from "../../redux/selectors";
import { useLocation, useMatch, useParams, Navigate, useNavigate } from "react-router-dom";
import { withModalAlert } from "../../hoc/withModalAlert";

function MainContainerWithEffect({ login }) {
    const totalTransCount = useSelector(selectors.totalTransCount)
    const transactions = useSelector(selectors.transactions);
    const initialized = useSelector(selectors.initialized);
    // const cardid = useSelector(selectors.cardID);
    const page = useSelector(selectors.curentPage);
    const pageSize = useSelector(selectors.pageSize);
    const card = useSelector(selectors.card);
    const isLoading = useSelector(selectors.isLoading)
    const { cardid } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getNextPage = (page) => dispatch(cardThunks.getTransactions(login, cardid, pageSize, page));
    useEffect(() => {
        dispatch(cardThunks.getTransactions(login, cardid, pageSize))
    }, [login, cardid])
    useEffect(() => {
        if (card) {
            dispatch(cardThunks.updateCard(card))
        }
    }, [card])
    const openTransaction = (item) => {
        dispatch(cardThunks.getTransaction(item))
        navigate(`/transaction/${item.id}`)
    }
    const maxPage = Math.ceil(totalTransCount / pageSize);
    if (!initialized) {
        return <Loader />
    }
    return <Main props={{ isLoading, transactions, login, cardid, page, pageSize, maxPage, getNextPage, openTransaction }} />
}
export default compose(WithAuthRedirect, withModalAlert)(MainContainerWithEffect)