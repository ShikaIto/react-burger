import React, { FC, useState } from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './AppHeader.module.css';
import { Link, useLocation } from 'react-router-dom';

const AppHeader: FC = () => {
  type TStyle = {
    color: string,
    icon: 'primary' | 'secondary'
  }

  const active: TStyle = { color: '#f2f2f3', icon: 'primary' };
  const inActive: TStyle = { color: '#8585ad', icon: 'secondary' };

  const [constructor, setConstructor] = useState(inActive);
  const [order, setOrder] = useState(inActive);
  const [profile, setProfile] = useState(inActive);

  const location = useLocation();

  React.useEffect(() => {
    location.pathname === '/' ? setConstructor(active) : setConstructor(inActive);
    location.pathname === '/feed' ? setOrder(active) : setOrder(inActive);
    location.pathname === '/profile' ? setProfile(active) : setProfile(inActive);
  }, [location]);

  return (
    <header className={`p-10`}>
      <div className={`${headerStyles.container} p-4`}>
        <nav className={headerStyles.nav}>
          <Link
            to='/'
            className={`${headerStyles.link} text text_type_main-default pl-5 pt-4 pr-5 pb-4`}>
            <BurgerIcon type={constructor.icon} />
            <span className='ml-2' style={{ color: constructor.color }}>
              Конструктор
            </span>
          </Link>
          <Link
            to='/feed'
            className={`${headerStyles.link} text text_type_main-default pl-5 pt-4 pr-5 pb-4`}>
            <ListIcon type={order.icon} />
            <span className='ml-2' style={{ color: order.color }}>
              Лента заказов
            </span>
          </Link>
        </nav>
        <Link to='/'>
          <Logo />
        </Link>
        <div>
          <Link
            to='/profile'
            className={`${headerStyles.link} text text_type_main-default pl-5 pt-4 pr-5 pb-4`}>
            <ProfileIcon type={profile.icon} />
            <span className='ml-2' style={{ color: profile.color }}>
              Личный кабинет
            </span>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default AppHeader