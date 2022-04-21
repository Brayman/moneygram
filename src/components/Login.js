import { useNavigate } from "react-router-dom";

function Login({SetUser,login}) {
    const navigate = useNavigate();
    function LoginClick() {
        SetUser('brayman')
    }
    if (!login) {
        return (
            <div className="home">
                <button onClick={() => LoginClick()}>login</button>
            </div>
        )
    } else {
        return (
            <div className="home">
                {login}
                {navigate(-1)}
            </div>    
        )
    }
    
}
export default Login;