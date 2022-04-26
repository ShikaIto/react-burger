import React from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import elementStyles from './ConstructorIngredient.module.css'
import { menuItemPropTypes } from '../../utils/constants';
import { useDrag, useDrop } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_INGREDIENT_IN_CONSTRUCTOR } from '../../services/actions/actions';

export default function ConstructorIngredient({ data, index }) {
    const { constructorIngredients } = useSelector(store => store);

    const dispatch = useDispatch();

    const handleDropSwap = (dragIndex, dropIndex) => {
        const arr = [...constructorIngredients];
        const item = arr.splice(dragIndex, 1, arr[dropIndex]);
        arr.splice(dropIndex, 1, item[0]);
        dispatch({ type: ADD_INGREDIENT_IN_CONSTRUCTOR, ingredients: arr });
    }

    const [{ isDrag }, dragRef] = useDrag({
        type: 'swap',
        item: { index },
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    const [, dropRef] = useDrop({
        accept: 'swap',
        drop(item) {
            handleDropSwap(item.index, index);
        },
    });

    const ref = React.useRef(null);
    const dragDropRef = dragRef(dropRef(ref));

    return (!isDrag &&
        <li className={elementStyles.element} draggable ref={dragDropRef} >
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