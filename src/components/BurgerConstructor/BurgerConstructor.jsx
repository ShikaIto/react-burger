import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './BurgerConstructor.module.css'

export default function BurgerConstructor(props) {
  const element = () => {
    return (
      <li>
        <DragIcon type='primary' />
        <ConstructorElement
          text={props.data.name}
          price={props.data.price}
          thumbnail={props.data.image}
        />
      </li>
    )
  }

  return (
    <>
      <div className={`${constructorStyles.container}`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${props.data.name} (верх)`}
          price={props.data.price}
          thumbnail={props.data.image}
        />
        <ul className={`${constructorStyles.list} pr-2`}>
          {element()}
          {element()}
          {element()}
          {element()}
          {element()}
          {element()}
          {element()}
          {element()}
          {element()}
        </ul>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${props.data.name} (низ)`}
          price={props.data.price}
          thumbnail={props.data.image}
        />
      </div>
      <div className={`${constructorStyles.box} mt-10 mr-4`}>
        <span className={`${constructorStyles.span} mr-10`}>
          <p className='text text_type_digits-medium mr-2'>5450</p>
          <CurrencyIcon type='primary' />
        </span>
        <Button type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
    </>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object)
};