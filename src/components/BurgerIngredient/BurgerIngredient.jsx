import React from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientStyles from './BurgerIngredient.module.css';
import { menuItemPropTypes } from '../../utils/constants';
import { useDrag } from "react-dnd";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { SET_CURRENT_INGREDIENT } from '../../services/actions/actions';
import { v4 as uuidv4 } from 'uuid';

export default function BurgerIngredient({ data, open }) {
    const [count, setCount] = React.useState(0);

    const { constructorIngredients } = useSelector(store => store);
    const bun = constructorIngredients.find(el => el.data.type === 'bun');

    const dispatch = useDispatch();

    const handleClick = React.useCallback((item) => {
        open(true);
        dispatch({ type: SET_CURRENT_INGREDIENT, ingredient: item });
    }, [open]);

    const [{ getItem, isDrag, isDrop }, dragRef] = useDrag({
        type: 'ingredients',
        item: {
            data,
            id: uuidv4()
        },
        collect: monitor => ({
            getItem: monitor.getItem(),
            isDrag: monitor.isDragging(),
            isDrop: monitor.didDrop()
        })
    });

    React.useEffect(() => {
        if (isDrag && getItem.data._id === data._id) {
            if (isDrop) {
                if (data.type === 'bun') {
                    setCount(count + 2);
                } else {
                    setCount(count + 1);
                }
            }
        } else if (constructorIngredients.length <= 0 ||
            bun && data.type === 'bun' && data._id !== bun.data._id) {
            setCount(0);
        } else if (data.type !== 'bun' && constructorIngredients.length > 0) {
            let num = 0;
            constructorIngredients.forEach(element => {
                if (element.data._id === data._id) {
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

BurgerIngredient.propTypes = {
    data: menuItemPropTypes.isRequired,
    open: PropTypes.func.isRequired
};