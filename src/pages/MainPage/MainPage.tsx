import styles from './MainPage.module.css';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import { useSelector } from '../../utils/hooks';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FC } from 'react';

const MainPage: FC = () => {
  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(store => store.main);

  return (
    <>
      {ingredientsRequest && <h1 style={{ color: '#f2f2f3' }} className='text text_type_main-large m-10'>Загрузка...</h1>}
      {ingredientsFailed && <h1 style={{ color: '#f2f2f3' }} className='text text_type_main-large m-10'>Произошла ошибка...</h1>}
      {!ingredientsRequest && !ingredientsFailed && ingredients.length &&
        <main className={`${styles.main} pb-10`}>
          <h1 className={`${styles.title} text text_type_main-large`}>Соберите бургер</h1>
          <DndProvider backend={HTML5Backend}>
            <section className={styles.ingredients}>
              <BurgerIngredients />
            </section>
            <section className={styles.burger}>
              <BurgerConstructor />
            </section>
          </DndProvider>
        </main>
      }
    </>
  )
}

export default MainPage