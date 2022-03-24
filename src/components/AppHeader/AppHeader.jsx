import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './AppHeader.module.css'

export default function AppHeader(props) {
  const [isActiveOrder, setIsActiveOrder] = useState(false);
  const [isActiveConstructor, setIsActiveConstructor] = useState(true);
  const [isActiveProfile, setIsActiveProfile] = useState(false);

  return (
    <header className={`${headerStyles.header} m-10 p-4`}>
      <nav className={headerStyles.nav}>
        <button className={`${headerStyles.button} text text_type_main-default pl-5 pt-4 pr-5 pb-4`}>
          <BurgerIcon type={isActiveConstructor ? 'primary' : 'secondary'} />
          <span className='ml-2' style={isActiveConstructor ? { color: '#f2f2f3' } : { color: '#8585ad' }}>
            Конструктор
          </span>
        </button>
        <button className={`${headerStyles.button} text text_type_main-default pl-5 pt-4 pr-5 pb-4`}>
          <ListIcon type={isActiveOrder ? 'primary' : 'secondary'} />
          <span className='ml-2' style={isActiveOrder ? { color: '#f2f2f3' } : { color: '#8585ad' }}>
            Лента заказов
          </span>
        </button>
      </nav>
      <Logo />
      <div>
        <button className={`${headerStyles.button} text text_type_main-default pl-5 pt-4 pr-5 pb-4`}>
          <ProfileIcon type={isActiveProfile ? 'primary' : 'secondary'} />
          <span className='ml-2' style={isActiveProfile ? { color: '#f2f2f3' } : { color: '#8585ad' }}>
            Личный кабинет
          </span>
        </button>
      </div>
    </header>
  )
}