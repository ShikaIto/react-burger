import React, { FC } from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientStyles from './BurgerIngredient.module.css';
import { useDrag } from "react-dnd";
import { useSelector, useDispatch } from '../../utils/hooks';
import { SET_CURRENT_INGREDIENT } from '../../services/actions/main';
import { v4 as uuidv4 } from 'uuid';
import { TIngredient } from '../../utils/types';

interface IBurgerIngredient {
    data: TIngredient
}

const BurgerIngredient: FC<IBurgerIngredient> = ({ data }) => {
    const [count, setCount] = React.useState(0);

    const { constructorIngredients } = useSelector(store => store.main);
    const bun = constructorIngredients.find((el) => el.type === 'bun');

    const dispatch = useDispatch();

    const handleClick = React.useCallback((item: TIngredient) => {
        dispatch({ type: SET_CURRENT_INGREDIENT, ingredient: item });
    }, [dispatch]);

    const [{ getItem, isDrag, isDrop }, dragRef] = useDrag({
        type: 'ingredients',
        item: {
            ...data,
            id: uuidv4()
        },
        collect: monitor => ({
            getItem: monitor.getItem(),
            isDrag: monitor.isDragging(),
            isDrop: monitor.didDrop()
        })
    });

    React.useEffect(() => {
        if (isDrag && getItem._id === data._id) {
            if (isDrop) {
                if (data.type === 'bun' && count < 2) {
                    setCount(count + 2);
                } else if (data.type !== 'bun') {
                    setCount(count + 1);
                }
            }
        } else if (constructorIngredients.length <= 0 ||
            bun && data.type === 'bun' && data._id !== bun._id) {
            setCount(0);
        } else if (data.type !== 'bun' && constructorIngredients.length > 0) {
            let num = 0;
            constructorIngredients.forEach(element => {
                if (element._id === data._id) {
                    num++;
                }
            });
            setCount(num);
        }
    }, [isDrag, isDrop, constructorIngredients, bun]);


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

export default BurgerIngredient