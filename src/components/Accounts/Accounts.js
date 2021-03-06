import { useDispatch, useSelector } from "react-redux"
import { compose } from "redux";
import './Accounts.css';
import { WithAuthRedirect } from "../../hoc/withAuthRedirect";
import * as selectors from "../../redux/selectors"
import { NavLink } from "react-router-dom";
import { BiWallet } from "react-icons/bi";
import { Navigation } from "../common/Navigation/Navigation";
import { Icon } from "../Icon/Icon";
import { Button } from "../common/Button/Buttons";
import Account from "../Account/Account";
import { useEffect } from "react";
import { accounThunks } from "../../redux/account";
import { walletThunks } from "../../redux/card";

function CardList({ balance }) {
    const cards = useSelector(selectors.cards);
    const login = useSelector(selectors.login)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(accounThunks.getBalanse(login))
    },[login, dispatch])
    useEffect(() => {
        dispatch(walletThunks.getWallets(login))
    },[login, dispatch])
    return (
        <section className="accounts">
            <Navigation title="Accounts" className="accounts__nav" />
            <Account balance={balance} />
            <menu className="accounts__list">
                {cards.map(card => {
                    return <NavLink
                        className="wallet"
                        to={`/wallet/${card._id}`}
                        key={card._id}>
                        <Icon icon={BiWallet} className="wallet__icon" />
                        <div className="wallet__name">
                            {card.name}
                        </div>
                        <div className="wallet__balance">
                            {`${card.currency} ${card.balance}`}
                        </div>
                    </NavLink>
                })}
            </menu>
            <NavLink className="accounts__button primary-btn" to={'/wallet/create'}>
                <Button primary>
                    Add new card
                </Button>

            </NavLink>
        </section>
    )
}
export default compose(WithAuthRedirect)(CardList);