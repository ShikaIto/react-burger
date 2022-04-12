import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientStyles from './BurgerIngredient.module.css';
import PropTypes from 'prop-types';
import { menuItemPropTypes } from '../../utils/constants';

export default function BurgerIngredient({ data, count }) {
    return (
        <>
            {count && <Counter count={count} size={undefined} />}
            <img src={data.image} alt={data.name} className={`${ingredientStyles.image} ml-4`} />
            <div className={`${ingredientStyles.price} mt-1 mb-1`}>
                <p className='text text_type_digits-default mr-2'>{data.price}</p>
                <CurrencyIcon type='primary' />
            </div>
            <h3 className={`${ingredientStyles.title} text text_type_main-default`}>{data.name}</h3>
        </>
    )
}

BurgerIngredient.propTypes = {
    data: menuItemPropTypes.isRequired,
    count: PropTypes.number
};