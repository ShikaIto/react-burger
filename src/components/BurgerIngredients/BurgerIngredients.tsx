import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';
import ingredientsStyles from './BurgerIngredients.module.css';
import { useSelector, useDispatch } from '../../utils/hooks';
import { SET_CURRENT_TAB } from '../../services/actions/main';
import { Link, useLocation } from 'react-router-dom';

export default function BurgerIngredients() {
  const bunsRef = React.useRef<any>(null);
  const soucesRef = React.useRef<any>(null);
  const mainRef = React.useRef<any>(null);

  const { ingredients, currentTab } = useSelector(store => store.main);

  const dispatch = useDispatch();
  const location = useLocation();

  const buns = ingredients.filter(item => item.type === 'bun');
  const sauces = ingredients.filter(item => item.type === 'sauce');
  const main = ingredients.filter(item => item.type === 'main');

  const setCurrent = React.useCallback((current: string) => {
    dispatch({ type: SET_CURRENT_TAB, tab: current });
  }, [dispatch]);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrent(entry.target.id);
        }
      });
    },
    {
      threshold: [1, 0.3]
    }
  );

  React.useEffect(() => {
    observer.observe(bunsRef.current);
    observer.observe(soucesRef.current);
    observer.observe(mainRef.current);

    return () => {
      observer.disconnect();
    }
  }, [bunsRef, soucesRef, mainRef]);

  return (
    <>
      <div style={{ display: 'flex' }}>
        <a href='#one' className={ingredientsStyles.tab}>
          <Tab value="one" active={currentTab === 'one'} onClick={setCurrent}>
            Булки
          </Tab></a>
        <a href='#two' className={ingredientsStyles.tab}>
          <Tab value="two" active={currentTab === 'two'} onClick={setCurrent}>
            Соусы
          </Tab></a>
        <a href='#three' className={ingredientsStyles.tab}>
          <Tab value="three" active={currentTab === 'three'} onClick={setCurrent}>
            Начинки
          </Tab></a>
      </div>
      <ul className={`${ingredientsStyles.scroll}`}>
        <li id='one' ref={bunsRef}>
          <h2 className='text text_type_main-medium'>Булки</h2>
          <ul className={`${ingredientsStyles.list} pl-4 pr-4`}>
            {buns.map((item) => (
              <Link
                className={ingredientsStyles.link}
                to={`/ingredients/${item._id}`}
                state={{ background: location }}
                key={item._id} >
                <BurgerIngredient data={item} />
              </Link>
            ))}
          </ul>
        </li>
        <li id='two' ref={soucesRef}>
          <h2 className='text text_type_main-medium'>Соусы</h2>
          <ul className={`${ingredientsStyles.list} pl-4 pr-4`}>
            {sauces.map((item) => (
              <Link
                className={ingredientsStyles.link}
                to={`/ingredients/${item._id}`}
                state={{ background: location }}
                key={item._id} >
                <BurgerIngredient data={item} />
              </Link>
            ))}
          </ul>
        </li>
        <li id='three' ref={mainRef}>
          <h2 className='text text_type_main-medium'>Начинки</h2>
          <ul className={`${ingredientsStyles.list} pl-4 pr-4`}>
            {main.map((item) => (
              <Link
                className={ingredientsStyles.link}
                to={`/ingredients/${item._id}`}
                state={{ background: location }}
                key={item._id} >
                <BurgerIngredient data={item} />
              </Link>
            ))}
          </ul>
        </li>
      </ul>
    </>
  )
}