import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientStyles from './BurgerIngredient.module.css';
import PropTypes from 'prop-types';
import { menuItemPropTypes } from '../../utils/constants';

export default function BurgerIngredient(props) {
    if (props.data.type === props.type) {
        return (
            <>
                {props.caunt && <Counter count={1} size={undefined} />}
                <img src={props.data.image} alt={props.data.name} className={`${ingredientStyles.image} ml-4`} />
                <div className={`${ingredientStyles.price} mt-1 mb-1`}>
                    <p className='text text_type_digits-default mr-2'>{props.data.price}</p>
                    <CurrencyIcon type='primary' />
                </div>
                <h3 className={`${ingredientStyles.title} text text_type_main-default`}>{props.data.name}</h3>
            </>
        )
    } else {
        return null
    }
}

BurgerIngredient.propTypes = {
    data: menuItemPropTypes.isRequired
};