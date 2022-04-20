import { Link, useLocation } from "react-router-dom"

function NotFound() {
    const location = useLocation()
    return (
        <div className="home">
            not found this page <Link className="special-text" to={location.pathname}>{location.pathname}</Link> or this page in developing
        </div>
    )
}

export default NotFound;