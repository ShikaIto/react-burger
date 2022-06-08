import React from 'react';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './BurgerConstructor.module.css'
import ConstructorIngredient from '../ConstructorIngredient/ConstructorIngredient.jsx';
import Modal from '../Modal/Modal.jsx';
import OrderDetails from '../OrderDetails/OrderDetails.jsx';
import { useSelector, useDispatch } from 'react-redux';
import {
  ADD_INGREDIENT_IN_CONSTRUCTOR, SET_TOTAL_PRICE, getOrder
} from '../../services/actions/main';
import { useDrop } from 'react-dnd';
import { Navigate } from 'react-router-dom';

export default function BurgerConstructor() {
  const [isModal, setIsModal] = React.useState(false);
  const [isOrder, setIsOrder] = React.useState(false);
  const [isBun, setIsBun] = React.useState(false);

  const { constructorIngredients, totalPrice } = useSelector(store => store.main);
  const auth = useSelector(store => store.profile.auth);

  const dispatch = useDispatch();

  const bun = constructorIngredients.find(item => item.data.type === 'bun');

  React.useEffect(() => {
    if (bun) {
      setIsBun(true);
    }
    let sum = constructorIngredients.reduce((sum, curr) => { return sum + curr.data.price }, 0);
    let total = bun ? sum + bun.data.price : sum;
    dispatch({ type: SET_TOTAL_PRICE, totalPrice: total });
  }, [constructorIngredients]);

  const handleClick = React.useCallback(() => {
    if (auth) {
      const items = constructorIngredients.map(item => item.data._id);
      items.push(bun.data._id);
      dispatch(getOrder(items));
      setIsModal(true);
    } else {
      setIsOrder(true);
    }
  }, [dispatch, constructorIngredients, auth]);

  const handleDrop = (item) => {
    if (item.data.type === 'bun' && constructorIngredients.find(el => el.data.type === 'bun')) {
      const index = constructorIngredients.findIndex(el => el.data.type === 'bun');
      const arr = [...constructorIngredients];
      arr.splice(index, 1, item);
      dispatch({ type: ADD_INGREDIENT_IN_CONSTRUCTOR, ingredients: arr });
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

  if (isOrder) {
    return <Navigate to='/login' />
  }

  return (
    <>
      <div className={`${constructorStyles.container}`} ref={dropTarget}>
        {constructorIngredients.length <= 0 &&
          <p style={{ color: '#8585ad' }} className='text text_type_main-default mt-30 mb-30'>
            Перенесите сюда ингредиенты для создания бургера
          </p>}
        {bun && <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun.data.name} (верх)`}
          price={bun.data.price}
          thumbnail={bun.data.image}
        />}
        <ul className={`${constructorStyles.list} pr-4`}>
          {constructorIngredients.map((ingredient, index) => {
            if (ingredient.data.type !== 'bun') {
              return (
                <ConstructorIngredient ingredient={ingredient} index={index} key={ingredient.id} />
              )
            }
          })}
        </ul>
        {bun && <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bun.data.name} (низ)`}
          price={bun.data.price}
          thumbnail={bun.data.image}
        />}
      </div>
      <div className={`${constructorStyles.box} mt-10 mr-4`}>
        <span className={`${constructorStyles.span} mr-10`}>
          <p className='text text_type_digits-medium mr-2'>{totalPrice}</p>
          <CurrencyIcon type='primary' />
        </span>
        {isBun && <span onClick={handleClick}>
          <Button type="primary" size="medium">
            Оформить заказ
          </Button>
        </span>}
      </div>
      {isModal && <Modal onClose={setIsModal}>
        <OrderDetails />
      </Modal>}
    </>
  )
}
