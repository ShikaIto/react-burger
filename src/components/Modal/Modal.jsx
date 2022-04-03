import PropTypes from 'prop-types';
import modalStyles from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../IngredientDetails/IngredientDetails.jsx';
import OrderDetails from '../OrderDetails/OrderDetails.jsx';
import { menuItemPropTypes } from '../../utils/constants.js';

export default function Modal(props) {

    return (
        <div className={modalStyles.modal}>
            <span className={modalStyles.close} onClick={props.close}>
                <CloseIcon type='primary' />
            </span>
            {props.order && <OrderDetails order={props.order} />}
            {props.ingredient && <IngredientDetails ingredient={props.ingredient} />}
        </div>
    )
}

Modal.prototypes = {
    close: PropTypes.func.isRequired,
    order: PropTypes.bool,
    ingredient: menuItemPropTypes
}