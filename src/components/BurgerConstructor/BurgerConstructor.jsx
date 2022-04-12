import React from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './BurgerConstructor.module.css'
import ConstructorIngredient from '../ConstructorIngredient/ConstructorIngredient.jsx';
import { menuItemPropTypes } from '../../utils/constants';
import Modal from '../Modal/Modal.jsx';
import OrderDetails from '../OrderDetails/OrderDetails.jsx';

export default function BurgerConstructor({ data, defaultBun }) {
  const total = data.reduce((sum, curr) => { return sum + curr.price }, 0);
  const [isModal, setIsModal] = React.useState(false);

  const isBun = data.find(item => item.type === 'bun');
  const bun = isBun ? isBun : defaultBun;
  /* в будущем я так понимаю сюда будет передаваться массив выбранных ингредиентов,
    проверка на случай если среди них не окажется булочки */

  return (
    <>
      <div className={`${constructorStyles.container}`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
        />
        <ul className={`${constructorStyles.list} pr-4`}>
          {data.map((ingredient) => {
            if (ingredient.type !== 'bun') {
              return (
                <React.Fragment key={ingredient._id}>
                  <ConstructorIngredient data={ingredient} />
                </React.Fragment>
              )
            } else {
              return null
            }
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
          <p className='text text_type_digits-medium mr-2'>{total}</p>
          <CurrencyIcon type='primary' />
        </span>
        <span onClick={() => { setIsModal(true) }}>
          <Button type="primary" size="medium">
            Оформить заказ
          </Button>
        </span>
      </div>
      {isModal && <Modal onClose={setIsModal}>
        <OrderDetails />
      </Modal>}
    </>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(menuItemPropTypes).isRequired
}