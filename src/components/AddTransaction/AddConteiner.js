import { useDispatch, useSelector } from "react-redux";
import { compose } from "redux";
import { WithAuthRedirect } from "../../hoc/withAuthRedirect";
import { cardThunks } from "../../redux/actions/card-actions";
import * as selectors from "../../redux/selectors";
import AddForm from "./AddTransaction";

export const Add = compose(
    WithAuthRedirect
)(() => {
    const dispatch = useDispatch();
    const props = {
        userid: useSelector(selectors.login),
        date: new Date().getTime(),
        cardid: useSelector(selectors.cardID),
        cards: useSelector(selectors.cards),
        modal: useSelector(selectors.modal),
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
        modal: useSelector(selectors.modal),
        userid: useSelector(selectors.login),
        cardid: useSelector(selectors.cardID),
        cards: useSelector(selectors.cards),
        Action: (form) => dispatch(cardThunks.editTrans(form))
    }
    return <AddForm {...props}/>
});