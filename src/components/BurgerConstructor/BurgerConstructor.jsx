import React from 'react';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './BurgerConstructor.module.css'
import ConstructorIngredient from '../ConstructorIngredient/ConstructorIngredient.jsx';
import Modal from '../Modal/Modal.jsx';
import OrderDetails from '../OrderDetails/OrderDetails.jsx';
import { useSelector, useDispatch } from 'react-redux';
import {
  ADD_BUN_IN_CONSTRUCTOR, ADD_INGREDIENT_IN_CONSTRUCTOR,
  SET_TOTAL_PRICE, getOrder, SET_COUNT_INGREDIENT
} from '../../services/actions/actions';
import { useDrop } from 'react-dnd';

export default function BurgerConstructor() {
  const { constructorIngredients, totalPrice, orderDetails, bun } = useSelector(store => store);

  const dispatch = useDispatch();

  React.useEffect(() => {
    let sum = constructorIngredients.reduce((sum, curr) => { return sum + curr.price }, 0);
    let total = bun.price * 2 + sum;
    dispatch({ type: SET_TOTAL_PRICE, totalPrice: total });
  }, [bun, constructorIngredients]);

  const handleClick = React.useCallback(() => {
    const items = constructorIngredients.map(item => item._id);
    items.push(bun._id, bun._id);
    dispatch(getOrder(items));
  }, [dispatch, constructorIngredients]);

  const handleDrop = (item) => {
    if (item.type === 'bun') {
      dispatch({ type: ADD_BUN_IN_CONSTRUCTOR, bun: item });
    } else {
      dispatch({ type: ADD_INGREDIENT_IN_CONSTRUCTOR, ingredients: [...constructorIngredients, item] });
    }
  }

  const [, dropTarget] = useDrop({
    accept: 'ingredients',
    drop(item) {
      handleDrop(item);
    }
  });

  return (
    <>
      <div className={`${constructorStyles.container}`} ref={dropTarget}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
        />
        <ul className={`${constructorStyles.list} pr-4`}>
          {constructorIngredients.map((ingredient, index) => {
            return (
              <React.Fragment key={index}>
                <ConstructorIngredient data={ingredient} index={index} />
              </React.Fragment>
            )
          })}
        </ul>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
      <div className={`${constructorStyles.box} mt-10 mr-4`}>
        <span className={`${constructorStyles.span} mr-10`}>
          <p className='text text_type_digits-medium mr-2'>{totalPrice}</p>
          <CurrencyIcon type='primary' />
        </span>
        <span onClick={handleClick}>
          <Button type="primary" size="medium">
            Оформить заказ
          </Button>
        </span>
      </div>
      {orderDetails && <Modal>
        <OrderDetails />
      </Modal>}
    </>
  )
}
