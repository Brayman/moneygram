import {
    BiUser
} from "react-icons/bi";
import { WithAuthRedirect } from "../../hoc/withAuthRedirect";
import { useEffect } from "react";
import { accountThunks } from "../../redux/actions/account-actions";
import { compose } from "redux";
import { connect, useSelector } from "react-redux";
import { setPreviousCardAC, setNextCardAC } from "../../redux/account";
import * as selectors from "../../redux/selectors"
import "./Profile.css"

function Profile({ userid, loadUser }) {
    useEffect(() => {
        loadUser(userid)
    }, [loadUser, userid])
    const user = useSelector(selectors.account)
    return (
        <section className="profile">
            <header className="profile__header">
                <div className="avatar">
                    {user.avatar == null ?
                        <BiUser className="avatar__image" /> :
                        <img
                            alt="avatar"
                            className="avatar__image"
                            src={user.avatar}
                        />}
                </div>
                <div className="profile__title">
                    <span className="profile-header__subtitle">
                        Name
                    </span>
                    <span className="profile-header__title">
                        {`${user.first_name} ${user.second_name}`}
                    </span>
                </div>
            </header>
            <menu className="profile__menu">
                <div className="menu__option">
                    <span>
                        Account
                    </span>
                </div>
                <div className="menu__option">
                    <span>
                        Settings
                    </span>
                </div>
                <div className="menu__option">
                    <span>
                        Logout
                    </span>
                </div>
            </menu>
        </section>
    )
}
const mapStateToProps = state => {
    return {
        userid: state.account.id,
        cards: state.card.cards,
        selectCard: state.card.selectCard
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadUser: (id) => dispatch(accountThunks.loadUser(id)),
        setPervCard: () => dispatch(setPreviousCardAC()),
        setNextCard: () => dispatch(setNextCardAC()),
    }
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect
)(Profile)
