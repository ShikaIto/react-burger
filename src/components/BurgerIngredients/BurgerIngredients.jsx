import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient.jsx';
import ingredientsStyles from './BurgerIngredients.module.css';
import { menuItemPropTypes } from '../../utils/constants.js';
import ModalOverlay from '../ModalOverlay/ModalOverlay.jsx'

export default function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState('one');
  const [isModal, setIsModal] = React.useState(false);
  const [ingredient, setIngredient] = React.useState(null);

  const handleClick = (item) => {
    setIngredient(item);
    setIsModal(true);
  }

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
      <ul className={`${ingredientsStyles.scroll}`}>
        <li>
          <h2 className='text text_type_main-medium'>Булки</h2>
          <ul className={`${ingredientsStyles.list} pl-4 pr-4`}>
            {props.data.map((item) => (
              <li key={item._id} className={ingredientsStyles.item} onClick={() => { handleClick(item) }}>
                <BurgerIngredient data={item} type='bun' />
              </li>
            ))}
          </ul>
        </li>
        <li>
          <h2 className='text text_type_main-medium'>Соусы</h2>
          <ul className={`${ingredientsStyles.list} pl-4 pr-4`}>
            {props.data.map((item) => (
              <li key={item._id} className={ingredientsStyles.item} onClick={() => { handleClick(item) }}>
                <BurgerIngredient data={item} type='sauce' />
              </li>
            ))}
          </ul>
        </li>
        <li>
          <h2 className='text text_type_main-medium'>Начинки</h2>
          <ul className={`${ingredientsStyles.list} pl-4 pr-4`}>
            {props.data.map((item) => (
              <li key={item._id} className={ingredientsStyles.item} onClick={() => { handleClick(item) }}>
                <BurgerIngredient data={item} type='main' />
              </li>
            ))}
          </ul>
        </li>
      </ul>
      {isModal && <ModalOverlay setIsModal={setIsModal} ingredient={ingredient} />}
    </>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(menuItemPropTypes).isRequired
}