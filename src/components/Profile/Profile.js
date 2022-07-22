import {
    BiUser,
    BiWallet,
    BiLogOut,
    BiCog
} from "react-icons/bi";
import { WithAuthRedirect } from "../../hoc/withAuthRedirect";
import { useEffect } from "react";
import { compose } from "redux";
import { connect, useSelector } from "react-redux";
import * as selectors from "../../redux/selectors"
import "./Profile.css"
import { Icon } from "../Icon/Icon";
import { accountThunks } from "../../redux/account";

function ProfileMenu({items}) {
    return (
        <menu className="profile__menu">
            {items.map(item => (
                <div className="menu__option">
                    <Icon icon={item.icon} className="option__icon" />
                    <span className="option__title">
                        {item.title}
                    </span>
                </div>
            ))}
        </menu>
    )
}

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
            <ProfileMenu items={[
                {
                    icon: BiWallet,
                    title: 'Account'
                },
                {
                    icon: BiCog,
                    title: 'Settings'
                },
                {
                    icon: BiLogOut,
                    title: 'Logout'
                }
            ]} />
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
    }
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect
)(Profile)
