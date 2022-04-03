import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import elementStyles from './ConstructorIngredient.module.css'
import { menuItemPropTypes } from '../../utils/constants';

export default function ConstructorIngredient(props) {
    return (
        <li className={elementStyles.element}>
            <DragIcon type='primary' />
            <ConstructorElement
                text={props.data.name}
                price={props.data.price}
                thumbnail={props.data.image}
            />
        </li>
    )
}

ConstructorIngredient.propTypes = {
    data: menuItemPropTypes.isRequired
};