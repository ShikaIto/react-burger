import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ anonymous = false, children }) {
    const { auth } = useSelector(store => store.profile);

    const location = useLocation();
    const from = location.state?.from;

    if (anonymous && auth) {
        return <Navigate to={from ? from : '/'} />
    }

    if (!anonymous && !auth) {
        return <Navigate to='/login' state={{ from: location.pathname }} replace={true} />
    }

    return <>{children}</>
}