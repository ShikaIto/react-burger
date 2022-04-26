import ingredientStyles from './IngredientDetails.module.css';
import { useSelector } from 'react-redux';

export default function IngredientDetails() {
    const currentIngredient = useSelector(store => store.currentIngredient);
    return (
        <>
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
        </>
    )
}
