import React from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientStyles from './BurgerIngredient.module.css';
import { menuItemPropTypes } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { ACTIVE_INGREDIENT_DETAILS } from '../../services/actions/actions.js';
import { useDrag } from "react-dnd";

export default function BurgerIngredient({ data }) {
    const bun = useSelector(store => store.bun);

    const [count, setCount] = React.useState(bun._id === data._id ? 2 : 0);
    const dispatch = useDispatch();

    const handleClick = React.useCallback((item) => {
        dispatch({ type: ACTIVE_INGREDIENT_DETAILS, ingredient: item });
    }, [dispatch]);

    const [{ getItem, isDrag, isDrop }, dragRef] = useDrag({
        type: 'ingredients',
        item: data,
        collect: monitor => ({
            getItem: monitor.getItem(),
            isDrag: monitor.isDragging(),
            isDrop: monitor.didDrop()
        })
    });

    React.useEffect(() => {
        if (isDrag && getItem._id === data._id) {
            if (isDrop) {
                if (data.type === 'bun') {
                    setCount(count + 2);
                } else {
                    setCount(count + 1);
                }
            }
        } else if (data.type === 'bun' && bun._id !== data._id) {
            setCount(0);
        }
    }, [isDrag, isDrop, bun]);


    return (
        <li className={ingredientStyles.item} onClick={() => { handleClick(data) }} ref={dragRef} draggable>
            {count > 0 && <Counter count={count} size={undefined} />}
            <img src={data.image} alt={data.name} className={`${ingredientStyles.image} ml-4`} />
            <div className={`${ingredientStyles.price} mt-1 mb-1`}>
                <p className='text text_type_digits-default mr-2'>{data.price}</p>
                <CurrencyIcon type='primary' />
            </div>
            <h3 className={`${ingredientStyles.title} text text_type_main-default`}>{data.name}</h3>
        </li>
    )
}

BurgerIngredient.propTypes = {
    data: menuItemPropTypes.isRequired,
};