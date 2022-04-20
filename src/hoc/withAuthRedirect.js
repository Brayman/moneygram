import { Navigate } from "react-router-dom";
export const WithAuthRedirect = (Component) => {
    function AuthRedirect(props) {
        console.log(props);
        if (!props.isAuth) return <Navigate replace to='/login'/>
        return <Component {...props} />
    }
    return AuthRedirect;
}