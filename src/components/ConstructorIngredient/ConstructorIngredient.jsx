import React from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import elementStyles from './ConstructorIngredient.module.css'
import { menuItemPropTypes } from '../../utils/constants';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import {
    DELETE_INGREDIENT_IN_CONSTRUCTOR, SWAP_INGREDIENT_IN_CONSTRUCTOR
} from '../../services/actions/actions';

export default function ConstructorIngredient({ ingredient, index }) {
    const dispatch = useDispatch();

    const handleClose = React.useCallback((id) => {
        dispatch({ type: DELETE_INGREDIENT_IN_CONSTRUCTOR, id: id });
    }, [dispatch]);

    const handleDropSwap = React.useCallback((dragIndex, dropIndex) => {
        dispatch({ type: SWAP_INGREDIENT_IN_CONSTRUCTOR, dragIndex: dragIndex, dropIndex: dropIndex });
    }, [dispatch]);

    const [{ isDrag }, dragRef] = useDrag({
        type: 'swap',
        item: { index },
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    const [, dropRef] = useDrop({
        accept: 'swap',
        hover(item, monitor) {
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            handleDropSwap(dragIndex, hoverIndex);

            item.index = hoverIndex;
        },

    });

    const opacity = isDrag ? 0 : 1;

    const ref = React.useRef(null);
    const dragDropRef = dragRef(dropRef(ref));

    return (
        <li className={elementStyles.element} draggable ref={dragDropRef} style={{ opacity }} >
            <DragIcon type='primary' />
            <ConstructorElement
                text={ingredient.data.name}
                price={ingredient.data.price}
                thumbnail={ingredient.data.image}
                handleClose={() => { handleClose(ingredient.id) }}
            />
        </li>
    )
}

ConstructorIngredient.propTypes = {
    ingredient: PropTypes.shape({
        data: menuItemPropTypes,
        id: PropTypes.string
    }).isRequired,
    index: PropTypes.number.isRequired
};