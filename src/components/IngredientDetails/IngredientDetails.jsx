import PropTypes from 'prop-types';
import ingredientStyles from './IngredientDetails.module.css';
import { menuItemPropTypes } from '../../utils/constants.js';

export default function IngredientDetails(props) {
    return (
        <>
            <h2 className={`text text_type_main-large mt-10 ${ingredientStyles.title}`}>Детали ингредиента</h2>
            <img src={props.ingredient.image_large} alt={props.ingredient.name} className={ingredientStyles.image}></img>
            <p className='text text_type_main-medium mt-4'>{props.ingredient.name}</p>
            <ul className={`${ingredientStyles.list} mt-8 mb-15`}>
                <li className={ingredientStyles.item}>
                    <p className='text text_type_main-default text_color_inactive'>Калории, ккал</p>
                    <p className='text text_type_main-default text_color_inactive'>{props.ingredient.calories}</p>
                </li>
                <li className={ingredientStyles.item}>
                    <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
                    <p className='text text_type_main-default text_color_inactive'>{props.ingredient.proteins}</p>
                </li>
                <li className={ingredientStyles.item}>
                    <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
                    <p className='text text_type_main-default text_color_inactive'>{props.ingredient.fat}</p>
                </li>
                <li className={ingredientStyles.item}>
                    <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
                    <p className='text text_type_main-default text_color_inactive'>{props.ingredient.carbohydrates}</p>
                </li>
            </ul>
        </>
    )
}

IngredientDetails.propTypes = {
    ingredient: menuItemPropTypes.isRequired
}