import { connect, useDispatch, useSelector } from "react-redux";
import { useLocation, useMatch } from "react-router-dom";
import { compose } from "redux";
import { WithAuthRedirect } from "../../hoc/withAuthRedirect";
import { actions, cardThunks } from "../../redux/actions/card-actions";
import { AddTransactionAction, createChangeAction } from "../../redux/card";
import * as selectors from "../../redux/selectors";
import AddForm from "./AddTransaction";
const mapStateToProps = state => {
    return {
        date: new Date().getTime(),
        userid: selectors.login(state),
        cardid: selectors.cardID(state),
        cards: selectors.cards(state)
    }
}
const mapDispatchToProps = dispatch => {
    return {
        Change: item => dispatch(createChangeAction(item)),
        Add: (value) => dispatch(cardThunks.saveTrans(value))
    }
}
export const Add = compose(
    WithAuthRedirect
)(() => {
    const dispatch = useDispatch();
    const props = {
        userid: useSelector(selectors.login),
        date: new Date().getTime(),
        cardid: useSelector(selectors.cardID),
        cards: useSelector(selectors.cards),
        Action: form => dispatch(cardThunks.saveTrans(form))
    }
    return <AddForm {...props}/>
});
export const Edit = compose(
    WithAuthRedirect
)(() => {
    const dispatch = useDispatch();
    const trans = useSelector(selectors.transaction)
    const props = {
        trans,
        userid: useSelector(selectors.login),
        cardid: useSelector(selectors.cardID),
        cards: useSelector(selectors.cards),
        Action: (form) => dispatch(cardThunks.editTrans(form))
    }
    return <AddForm {...props}/>
});