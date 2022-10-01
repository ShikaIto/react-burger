import styles from './Orders.module.css';
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { logout } from '../../services/actions/profile';
import { useSelector, useDispatch } from '../../utils/hooks';
import { WS_AUTH_CONNECTION_START, WS_AUTH_CONNECTION_CLOSED } from '../../services/actions/socket';
import FeedElement from '../../components/FeedElement/FeedElement';
import { Link, useLocation } from "react-router-dom";
import { getCookie } from '../../utils/utils';

const Orders: FC = () => {
    const dispatch = useDispatch();
    const { wsConnectedAuth, orders, error } = useSelector(store => store.socket);

    const location = useLocation();

    React.useEffect(() => {
        dispatch({ type: WS_AUTH_CONNECTION_START, payload: `?token=${getCookie('token').slice(7)}` });

        return () => {
            dispatch({ type: WS_AUTH_CONNECTION_CLOSED });
        }
    }, [dispatch]);

    const handleClick = () => {
        dispatch(logout(localStorage.getItem('token')));
    }

    return (
        <>
            {!wsConnectedAuth && <h1 style={{ color: '#f2f2f3' }} className='text text_type_main-large m-10'>Подключение...</h1>}
            {error && <h1 style={{ color: '#f2f2f3' }} className='text text_type_main-large m-10'>Произошла ошибка...</h1>}
            {wsConnectedAuth && !error && orders &&
                <main className={styles.main}>
                    <div className={`${styles.links} mt-30`}>
                        <NavLink
                            end
                            to='/profile'
                            className={({ isActive }) =>
                                isActive ? `${styles.activeLink} text text_type_main-medium mb-9`
                                    : `${styles.link} text text_type_main-medium mb-9`}>
                            Профиль
                        </NavLink>
                        <NavLink
                            to='/profile/orders'
                            className={({ isActive }) =>
                                isActive ? `${styles.activeLink} text text_type_main-medium mb-9`
                                    : `${styles.link} text text_type_main-medium mb-9`}>
                            История заказов
                        </NavLink>
                        <a className={`${styles.link} text text_type_main-medium mb-9`} onClick={handleClick}>
                            Выход
                        </a>
                        <p className={`${styles.text} text text_type_main-default text_color_inactive mr-15 mt-20`}>
                            В этом разделе вы можете просмотреть свою историю заказов
                        </p>
                    </div>
                    <ul className={`${styles.list}`}>
                        {orders.map((item, index) => {
                            return (
                                <Link
                                    key={index}
                                    to={`/profile/orders/${item.number}`}
                                    state={{ background: location }}
                                    className={styles.order_link}>
                                    <FeedElement data={item} profile={true} />
                                </Link>)
                        })}
                    </ul>
                </main>}
        </>
    )
}

export default Orders