import React from 'react';
import appStyles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader.jsx';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.jsx';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/actions.js';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


export default function App() {
  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(store => store);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch])

  return (
    <>
      < AppHeader />
      {ingredientsRequest && <h1 style={{ color: '#f2f2f3' }} className='text text_type_main-large m-10'>Загрузка...</h1>}
      {ingredientsFailed && <h1 style={{ color: '#f2f2f3' }} className='text text_type_main-large m-10'>Произошла ошибка...</h1>}
      {!ingredientsRequest && !ingredientsFailed && ingredients.length &&
        <main className={`${appStyles.main} pb-10`}>
          <h1 className={`${appStyles.title} text text_type_main-large`}>Соберите бургер</h1>
          <DndProvider backend={HTML5Backend}>
            <section className={appStyles.ingredients}>
              <BurgerIngredients />
            </section>
            <section className={appStyles.constructor}>
              <BurgerConstructor />
            </section>
          </DndProvider>
        </main>
      }
    </>
  )
}