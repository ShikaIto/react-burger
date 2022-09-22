import AppHeader from '../AppHeader/AppHeader';
import React from 'react';
import { useDispatch } from '../../utils/hooks';
import { getIngredients } from '../../services/actions/main';
import { getUser } from '../../services/actions/profile';
import { getCookie } from '../../utils/utils';
import { Route, Routes, useLocation } from 'react-router-dom';
import MainPage from '../../pages/MainPage/MainPage';
import ProtectedRoute from '../ProtectedRoute';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';
import ForgotPassword from '../../pages/ForgotPassword/ForgotPassword';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';
import Profile from '../../pages/Profile/Profile';
import NotFound from '../../pages/NotFound404/NotFound404';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import Feed from '../../pages/Feed/Feed';
import Orders from '../../pages/Orders/Orders';
import FeedOrderDetails from '../FeedOrderDetails/FeedOrderDetails';

declare module 'react' {
    interface FunctionComponent<P = {}> {
        (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
    }
}

export default function App() {
    const dispatch = useDispatch();
    const token = getCookie('token');

    const location: any = useLocation();
    const background = location.state?.background;

    React.useEffect(() => {
        dispatch(getIngredients());
        if (token) {
            dispatch(getUser());
        }
    }, [dispatch]);

    return (
        <>
            < AppHeader />
            <Routes location={background || location}>
                <Route path='/' element={<MainPage />} />
                <Route path='/feed' element={<Feed />} />
                <Route path='/ingredients/:id' element={<IngredientDetails />} />
                <Route path='/feed/:id' element={<FeedOrderDetails />} />
                <Route path='/profile/orders/:id' element={
                    <ProtectedRoute>
                        <FeedOrderDetails />
                    </ProtectedRoute>
                } />
                <Route path='/login' element={
                    <ProtectedRoute anonymous={true}>
                        <Login />
                    </ProtectedRoute>
                } />
                <Route path='/register' element={
                    <ProtectedRoute anonymous={true}>
                        <Register />
                    </ProtectedRoute>
                } />
                <Route path='/forgot-password' element={
                    <ProtectedRoute anonymous={true}>
                        <ForgotPassword />
                    </ProtectedRoute>
                } />
                <Route path='/reset-password' element={
                    <ProtectedRoute anonymous={true} >
                        <ResetPassword />
                    </ProtectedRoute>
                } />
                <Route path='/profile' element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                } />
                <Route path='/profile/orders' element={
                    <ProtectedRoute>
                        <Orders />
                    </ProtectedRoute>
                } />
                <Route path='*' element={<NotFound />} />
            </Routes>
            {background && <Routes>
                <Route path='/ingredients/:id' element={
                    <Modal>
                        <IngredientDetails />
                    </Modal>
                } />
                <Route path='/feed/:id' element={
                    <Modal>
                        <FeedOrderDetails />
                    </Modal>
                } />
                <Route path='/profile/orders/:id' element={
                    <ProtectedRoute>
                        <Modal>
                            <FeedOrderDetails />
                        </Modal>
                    </ProtectedRoute>
                } />
            </Routes>}
        </>
    )
}