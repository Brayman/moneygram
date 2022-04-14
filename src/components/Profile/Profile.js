import Account from "../Account/Account";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function ArrowButton({props}) {
    switch (props) {
        case 'left':
            return (
                <button className="left_button">
                    <BiChevronLeft size={30}/>
                </button>
            )
        case 'right':
            return (
                <button className="right_button">
                    <BiChevronRight size={30}/>
                </button>
            )
        default:
            return <noscript/>
    }
}

function Profile({accountData}) {
    const navigate = useNavigate();
    return (
        <div>
            <section className='cards'>
               <ArrowButton props='left'/>
               <Account data={accountData}/>
               <ArrowButton props='right'/>
            </section>
            <p>{accountData.login}</p>
            <p>{accountData.first_name}</p>
            <p>{accountData.second_name}</p>
            <p>{accountData.mail}</p>
            <button onClick={() => navigate("/settings")}>
                Settings
            </button>
        </div>
    )
}
export default Profile;