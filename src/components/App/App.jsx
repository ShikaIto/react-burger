import React from 'react';
import ReactDOM from 'react-dom';
import { data } from '../../utils/data.js';
import appStyles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader.jsx';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.jsx';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.jsx';

export default function App(props) {
  return (
    <>
      <AppHeader />
      <main className={`${appStyles.main} pb-10`}>
        <h1 className={`${appStyles.title} text text_type_main-large`}>Соберите бургер</h1>
        <section className={appStyles.ingredients}>
          <BurgerIngredients data={data} />
        </section>
        <section className={appStyles.constructor}>
          <BurgerConstructor data={data[0]} />
        </section>
      </main>
    </>
  )
}