import AppHeader from '../AppHeader/AppHeader.jsx';
import React from 'react';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/main.js';
import { getUser } from '../../services/actions/profile.js';
import { getCookie } from '../../utils/utils.js';
import { Route, Routes, useLocation } from 'react-router-dom';
import MainPage from '../../pages/MainPage/MainPage.jsx';
import ProtectedRoute from '../ProtectedRoute.jsx';
import Login from '../../pages/Login/Login.jsx';
import Register from '../../pages/Register/Register.jsx';
import ForgotPassword from '../../pages/ForgotPassword/ForgotPassword.jsx';
import ResetPassword from '../../pages/ResetPassword/ResetPassword.jsx';
import Profile from '../../pages/Profile/Profile.jsx';
import NotFound from '../../pages/NotFound404/NotFound404.jsx';
import IngredientDetails from '../IngredientDetails/IngredientDetails.jsx';
import Modal from '../Modal/Modal.jsx';
import Feed from '../../pages/Feed/Feed.jsx';
import Orders from '../../pages/Orders/Orders.jsx';
import FeedOrderDetails from '../FeedOrderDetails/FeedOrderDetails.jsx';

export default function App() {
    const dispatch = useDispatch();
    const token = getCookie('token');

    const location = useLocation();
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