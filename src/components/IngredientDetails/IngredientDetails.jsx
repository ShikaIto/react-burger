import ingredientStyles from './IngredientDetails.module.css';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { useParams } from 'react-router-dom';
import { SET_CURRENT_INGREDIENT } from '../../services/actions/main';

export default function IngredientDetails() {
    const { currentIngredient, ingredients } = useSelector(store => store.main);

    const dispatch = useDispatch();
    const { id } = useParams();

    React.useEffect(() => {
        if (!currentIngredient) {
            const ingredient = ingredients.find(el => el._id === id);
            dispatch({ type: SET_CURRENT_INGREDIENT, ingredient: ingredient });
        }
    }, [ingredients]);

    return (
        currentIngredient ? (<div className={ingredientStyles.container}>
            <h2 className={`text text_type_main-large mt-10 ${ingredientStyles.title}`}>Детали ингредиента</h2>
            <img src={currentIngredient.image_large} alt={currentIngredient.name} className={ingredientStyles.image}></img>
            <p className='text text_type_main-medium mt-4'>{currentIngredient.name}</p>
            <ul className={`${ingredientStyles.list} mt-8 mb-15`}>
                <li className={ingredientStyles.item}>
                    <p className='text text_type_main-default text_color_inactive'>Калории, ккал</p>
                    <p className='text text_type_main-default text_color_inactive'>{currentIngredient.calories}</p>
                </li>
                <li className={ingredientStyles.item}>
                    <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
                    <p className='text text_type_main-default text_color_inactive'>{currentIngredient.proteins}</p>
                </li>
                <li className={ingredientStyles.item}>
                    <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
                    <p className='text text_type_main-default text_color_inactive'>{currentIngredient.fat}</p>
                </li>
                <li className={ingredientStyles.item}>
                    <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
                    <p className='text text_type_main-default text_color_inactive'>{currentIngredient.carbohydrates}</p>
                </li>
            </ul>
        </div>) : null
    )
}
