import React from 'react';
import ReactDOM from 'react-dom';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientStyles from './BurgerIngredient.module.css';

export default function BurgerIngredient(props) {
    if (props.data.type === props.type) {
        return (
            <li className={ingredientStyles.item}>
                {props.caunt ? (<Counter count={1} size={undefined} />) : null}
                <img src={props.data.image} alt={props.data.name} className={`${ingredientStyles.image} ml-4`} />
                <div className={`${ingredientStyles.price} mt-1 mb-1`}>
                    <p className='text text_type_digits-default mr-2'>{props.data.price}</p>
                    <CurrencyIcon type='primary' />
                </div>
                <h3 className={`${ingredientStyles.title} text text_type_main-default`}>{props.data.name}</h3>
            </li>
        )
    } else {
        return null
    }
}