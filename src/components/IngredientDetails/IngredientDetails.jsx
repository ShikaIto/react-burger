import PropTypes from 'prop-types';
import ingredientStyles from './IngredientDetails.module.css';
import { menuItemPropTypes } from '../../utils/constants.js';

export default function IngredientDetails({ ingredient }) {
    return (
        <>
            <img src={ingredient.image_large} alt={ingredient.name} className={ingredientStyles.image}></img>
            <p className='text text_type_main-medium mt-4'>{ingredient.name}</p>
            <ul className={`${ingredientStyles.list} mt-8 mb-15`}>
                <li className={ingredientStyles.item}>
                    <p className='text text_type_main-default text_color_inactive'>Калории, ккал</p>
                    <p className='text text_type_main-default text_color_inactive'>{ingredient.calories}</p>
                </li>
                <li className={ingredientStyles.item}>
                    <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
                    <p className='text text_type_main-default text_color_inactive'>{ingredient.proteins}</p>
                </li>
                <li className={ingredientStyles.item}>
                    <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
                    <p className='text text_type_main-default text_color_inactive'>{ingredient.fat}</p>
                </li>
                <li className={ingredientStyles.item}>
                    <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
                    <p className='text text_type_main-default text_color_inactive'>{ingredient.carbohydrates}</p>
                </li>
            </ul>
        </>
    )
}

IngredientDetails.propTypes = {
    ingredient: menuItemPropTypes.isRequired
}