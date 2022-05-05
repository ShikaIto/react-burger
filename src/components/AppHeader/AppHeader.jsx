import React, { useState } from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './AppHeader.module.css'

export default function AppHeader() {
  const [state, setState] = useState({
    constructor: true,
    order: false,
    profile: false
  });

  return (
    <header className={`p-10`}>
      <div className={`${headerStyles.container} p-4`}>
        <nav className={headerStyles.nav}>
          <a href='#' className={`${headerStyles.link} text text_type_main-default pl-5 pt-4 pr-5 pb-4`}>
            <BurgerIcon type={state.constructor ? 'primary' : 'secondary'} />
            <span className='ml-2' style={state.constructor ? { color: '#f2f2f3' } : { color: '#8585ad' }}>
              Конструктор
            </span>
          </a>
          <a href='#' className={`${headerStyles.link} text text_type_main-default pl-5 pt-4 pr-5 pb-4`}>
            <ListIcon type={state.order ? 'primary' : 'secondary'} />
            <span className='ml-2' style={state.order ? { color: '#f2f2f3' } : { color: '#8585ad' }}>
              Лента заказов
            </span>
          </a>
        </nav>
        <Logo />
        <div>
          <a href='#' className={`${headerStyles.link} text text_type_main-default pl-5 pt-4 pr-5 pb-4`}>
            <ProfileIcon type={state.profile ? 'primary' : 'secondary'} />
            <span className='ml-2' style={state.profile ? { color: '#f2f2f3' } : { color: '#8585ad' }}>
              Личный кабинет
            </span>
          </a>
        </div>
      </div>
    </header>
  )
}