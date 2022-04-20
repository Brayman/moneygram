import Account from "../Account/Account";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Cards from "../Cards/CardsComponent";
import { WithAuthRedirect } from "../../hoc/withAuthRedirect";
import { connect } from "react-redux";

function ArrowButton({props, setNextCard, setPervCard}) {
    switch (props) {
        case 'left':
            return (
                <button className="left_button" onClick={() => setPervCard()}>
                    <BiChevronLeft size={30}/>
                </button>
            )
        case 'right':
            return (
                <button className="right_button"  onClick={() => setNextCard()}>
                    <BiChevronRight size={30}/>
                </button>
            )
        default:
            return <noscript/>
    }
}

function Profile({account,setUser, card, setCards, setNextCard, setPervCard}) {
    const navigate = useNavigate();
   
    return (
        <div  className="home">
            <section className='cards'>
               <ArrowButton props='left' setPervCard={setPervCard}/>
               <Cards card={card} setCards={setCards} setUser={setUser}/>
               <ArrowButton props='right' setNextCard={setNextCard}/>
            </section>
            
            <p>{account.login}</p>
            <p>{account.first_name}</p>
            <p>{account.second_name}</p>
            <p>{account.mail}</p>
            <button onClick={() => navigate("/settings")}>
                Settings
            </button>
        </div>
    )
}
export default WithAuthRedirect(Profile);