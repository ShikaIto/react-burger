import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "../utils/hooks";

interface IProtectedRoute {
    anonymous?: boolean,
    children: ReactNode
}

export default function ProtectedRoute({ anonymous = false, children }: IProtectedRoute) {
    const { auth } = useSelector(store => store.profile);

    const location: any = useLocation();
    const from = location.state?.from;

    if (anonymous && auth) {
        return <Navigate to={from ? from : '/'} />
    }

    if (!anonymous && !auth) {
        return <Navigate to='/login' state={{ from: location.pathname }} replace={true} />
    }

    return <>{children}</>
}