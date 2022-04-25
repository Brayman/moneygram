import { useNavigate } from "react-router-dom";
import { Field } from "redux-form";
import { reduxForm } from "redux-form";
import { Input, InputPass } from "./common/FormControls";
import style from './common/FormControls.module.css';

function loginForm(props) {
    return (
        <form className="form" onSubmit={props.handleSubmit}>
            <Field placeholder="Login" name="login" component={Input}/>
            <Field placeholder="Password" name="pass" component={InputPass}/>
            {props.error && <div className={style.error}>{props.error}</div>}
            <button>Login</button>
        </form>
    )
}
const LoginReduxForm = reduxForm({form: 'login'})(loginForm)

function Login({SetUser,login}) {
    const navigate = useNavigate();
    const onSubmit = (FormData) => {
        SetUser(FormData)
    }
    if (!login) {
        return (
            <div className="home">
                <LoginReduxForm onSubmit={onSubmit}/>
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