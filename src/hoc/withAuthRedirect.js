import { Navigate, useLocation } from "react-router-dom";
export const WithAuthRedirect = (Component) => {
    function AuthRedirect(props) {
        const location = useLocation()
        if (!props.isAuth) return <Navigate to='/login' state={location.pathname}/>
        return <Component {...props} />
    }
    return AuthRedirect;
}