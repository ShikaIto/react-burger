import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';
import ingredientsStyle from './BurgerIngredients.module.css';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

export default function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState('one')

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <ul className={`${ingredientsStyle.scroll}`}>
        <li>
          <h2 className='text text_type_main-medium'>Булки</h2>
          <ul className={`${ingredientsStyle.list} pl-4 pr-4`}>
            {props.data.map((ingredient) => (
              <React.Fragment key={ingredient._id}>
                <BurgerIngredient data={ingredient} type='bun' />
              </React.Fragment>
            ))}
          </ul>
        </li>
        <li>
          <h2 className='text text_type_main-medium'>Соусы</h2>
          <ul className={`${ingredientsStyle.list} pl-4 pr-4`}>
            {props.data.map((ingredient) => (
              <React.Fragment key={ingredient._id}>
                <BurgerIngredient data={ingredient} type='sauce' />
              </React.Fragment>
            ))}
          </ul>
        </li>
        <li>
          <h2 className='text text_type_main-medium'>Начинки</h2>
          <ul className={`${ingredientsStyle.list} pl-4 pr-4`}>
            {props.data.map((ingredient) => (
              <React.Fragment key={ingredient._id}>
                <BurgerIngredient data={ingredient} type='main' />
              </React.Fragment>
            ))}
          </ul>
        </li>
      </ul>
    </>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object)
};