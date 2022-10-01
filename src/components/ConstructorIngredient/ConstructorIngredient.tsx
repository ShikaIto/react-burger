import React, { FC } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import elementStyles from './ConstructorIngredient.module.css'
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import {
    DELETE_INGREDIENT_IN_CONSTRUCTOR, SWAP_INGREDIENT_IN_CONSTRUCTOR
} from '../../services/actions/main';
import { TIngredient } from '../../utils/types';

interface IConstructorIngredient {
    ingredient: TIngredient,
    index: number
}

const ConstructorIngredient: FC<IConstructorIngredient> = ({ ingredient, index }) => {
    const dispatch = useDispatch();

    const handleClose = React.useCallback((id: string) => {
        dispatch({ type: DELETE_INGREDIENT_IN_CONSTRUCTOR, id: id });
    }, [dispatch]);

    const handleDropSwap = React.useCallback((dragIndex: number, dropIndex: number) => {
        dispatch({ type: SWAP_INGREDIENT_IN_CONSTRUCTOR, dragIndex: dragIndex, dropIndex: dropIndex });
    }, [dispatch]);

    const [{ isDrag }, dragRef] = useDrag({
        type: 'swap',
        item: { index },
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    interface IItem {
        index: number
    }

    const [, dropRef] = useDrop({
        accept: 'swap',
        hover(item: IItem, monitor) {
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = (clientOffset === null) ? 0 : clientOffset.y - hoverBoundingRect.top;

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

    const ref = React.useRef<any>(null);
    const dragDropRef: any = dragRef(dropRef(ref));

    return (
        <li className={elementStyles.element} draggable ref={dragDropRef} style={{ opacity }} >
            <DragIcon type='primary' />
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={() => { handleClose(ingredient.id) }}
            />
        </li>
    )
}

export default ConstructorIngredient