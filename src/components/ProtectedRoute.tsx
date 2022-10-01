import { ReactNode, FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "../utils/hooks";

interface IProtectedRoute {
    anonymous?: boolean,
    children: ReactNode
}

const ProtectedRoute: FC<IProtectedRoute> = ({ anonymous = false, children }) => {
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

export default ProtectedRoute