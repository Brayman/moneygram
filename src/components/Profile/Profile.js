import Account from "../Account/Account";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function Profile({accountData}) {
    const navigate = useNavigate();
    return (
        <div>
            <Account data={accountData}/>
            <BiChevronLeft className="left_button"/>
            <button onClick={() => navigate("/settings")}>
                Settings
            </button>
        </div>
    )
}
export default Profile;