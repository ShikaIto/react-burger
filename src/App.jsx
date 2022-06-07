import AppHeader from './components/AppHeader/AppHeader.jsx';
import React from 'react';
import { useDispatch } from 'react-redux';
import { getIngredients } from './services/actions/main.js';
import { getUser } from './services/actions/profile.js';
import { getCookie } from './utils/utils.js';
import { Route, Routes, useLocation } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword/ResetPassword.jsx';
import Profile from './pages/Profile/Profile.jsx';
import NotFound from './pages/NotFound404/NotFound404.jsx';
import IngredientDetails from './components/IngredientDetails/IngredientDetails.jsx';
import Modal from './components/Modal/Modal.jsx';

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
                <Route path='/ingredients/:id' element={<IngredientDetails />} />
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
                <Route path='*' element={<NotFound />} />
            </Routes>
            {background && <Routes>
                <Route path='/ingredients/:id' element={
                    <Modal>
                        <IngredientDetails />
                    </Modal>
                } />
            </Routes>}
        </>
    )
}