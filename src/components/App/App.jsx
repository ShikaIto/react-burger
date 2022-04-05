import React from 'react';
import { api } from '../../utils/constants.js';
import appStyles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader.jsx';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.jsx';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.jsx';

export default function App() {
  const [state, setState] = React.useState({
    ingredients: [],
    isLoading: false,
    hasError: false
  });

  React.useEffect(() => {
    const getData = () => {
      setState({ ...state, isLoading: true });
      fetch(`${api}ingredients`)
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            return Promise.reject();
          }
        })
        .then(res => { setState({ ...state, ingredients: res.data, isLoading: false }) })
        .catch(e => { setState({ ...state, hasError: true, isLoading: false }) })
    }

    getData();
  }, [])

  const { ingredients, isLoading, hasError } = state;

  const defaultBun = ingredients.find(ingredient => ingredient.type === 'bun');

  return (
    <>
      < AppHeader />
      {isLoading && <h1 style={{ color: '#f2f2f3' }} className='text text_type_main-large m-10'>Загрузка...</h1>}
      {hasError && <h1 style={{ color: '#f2f2f3' }} className='text text_type_main-large m-10'>Произошла ошибка...</h1>}
      {!isLoading && !hasError && ingredients.length &&
        <main className={`${appStyles.main} pb-10`}>
          <h1 className={`${appStyles.title} text text_type_main-large`}>Соберите бургер</h1>
          <section className={appStyles.ingredients}>
            <BurgerIngredients data={ingredients} />
          </section>
          <section className={appStyles.constructor}>
            <BurgerConstructor data={ingredients} defaultBun={defaultBun} />
          </section>
        </main>
      }
    </>
  )
}