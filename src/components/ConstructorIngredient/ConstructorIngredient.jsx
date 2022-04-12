import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import elementStyles from './ConstructorIngredient.module.css'
import { menuItemPropTypes } from '../../utils/constants';

export default function ConstructorIngredient({ data }) {
    return (
        <li className={elementStyles.element}>
            <DragIcon type='primary' />
            <ConstructorElement
                text={data.name}
                price={data.price}
                thumbnail={data.image}
            />
        </li>
    )
}

ConstructorIngredient.propTypes = {
    data: menuItemPropTypes.isRequired
};