import { useSelector } from "react-redux"
import { compose } from "redux";
import './Accounts.css';
import { WithAuthRedirect } from "../../hoc/withAuthRedirect";
import * as selectors from "../../redux/selectors"
import { NavLink } from "react-router-dom";
import { BiWallet } from "react-icons/bi";
import { Navigation } from "../common/Navigation/Navigation";
import { Icon } from "../Icon/Icon";
import { Button } from "../common/Button/Buttons";

function Accounts({balance}) {
    const cards = useSelector(selectors.cards);
    return (

        <CardList cards={cards} balance={balance} />

    )
}
function CardList({ cards, balance }) {
    return (
        <section className="accounts">
            <Navigation title="Accounts" className="accounts__nav" />
            <section className="accounts__balance">
                <div className="balance__subtitle">
                    Account balance
                </div>
                <div className="balance__title">
                    USD {balance}
                </div>
            </section>
            <menu className="accounts__list">
                {cards.map(card => {
                    return <NavLink
                        className="wallet"
                        to={`/transactions/${card._id}`}
                        key={card.id}>
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
            <NavLink className="accounts__button primary-btn" to={'/create-card'}>
                <Button primary>
                    Add new card
                </Button>

            </NavLink>
        </section>
    )
}
export default compose(WithAuthRedirect)(Accounts);