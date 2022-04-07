import Account from "../Account/Account";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function Profile() {
    const navigate = useNavigate();
    return (
        <div>
            <Account/>
            <BiChevronLeft className="left_button"/>
            <button onClick={() => navigate("/settings")}>
                Settings
            </button>
        </div>
    )
}
export default Profile;