import { Navigate } from "react-router-dom";
export const WithAuthRedirect = (Component) => {
    function AuthRedirect(props) {
        if (!props.isAuth) return <Navigate to='/login' />
        return <Component {...props} />
    }
    return AuthRedirect;
}