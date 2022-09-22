import { typeOptions } from '@testing-library/user-event/dist/type/typeImplementation';
import {
    SET_TOTAL_PRICE, GET_INGREDIENTS, GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_SUCCESS, SET_CURRENT_TAB,
    ADD_INGREDIENT_IN_CONSTRUCTOR, GET_ORDER, GET_ORDER_FAILED,
    GET_ORDER_SUCCESS, SET_CURRENT_INGREDIENT, SWAP_INGREDIENT_IN_CONSTRUCTOR,
    DELETE_INGREDIENT_IN_CONSTRUCTOR, GET_CURRENT_ORDER, GET_CURRENT_ORDER_FAILED,
    GET_CURRENT_ORDER_SUCCESS, SET_CURRENT_ORDER, getCurrentOrder, getIngredients, getOrder
} from '../actions/main';
import { TIngredient, TOrder } from '../../utils/types';

export interface ISetTotalPrice {
    readonly type: typeof SET_TOTAL_PRICE,
    readonly totalPrice: number
}

export interface IGetIngredients {
    readonly type: typeof GET_INGREDIENTS
}

export interface IGetIngredientsFailed {
    readonly type: typeof GET_INGREDIENTS_FAILED
}

export interface IGetIngredientsSuccess {
    readonly type: typeof GET_INGREDIENTS_SUCCESS,
    readonly ingredients: TIngredient[]
}

export interface ISetCurrentTab {
    readonly type: typeof SET_CURRENT_TAB,
    readonly tab: string
}

export interface IAddIngredientInConstructor {
    readonly type: typeof ADD_INGREDIENT_IN_CONSTRUCTOR,
    readonly ingredients: TIngredient[]
}

export interface IGetOrder {
    readonly type: typeof GET_ORDER
}

export interface IGetOrderFailed {
    readonly type: typeof GET_ORDER_FAILED
}

export interface IGetOrderSuccess {
    readonly type: typeof GET_ORDER_SUCCESS,
    readonly order: number
}

export interface ISetCurrentIngredient {
    readonly type: typeof SET_CURRENT_INGREDIENT,
    readonly ingredient: TIngredient
}

export interface ISwapIngredientsInConstructor {
    readonly type: typeof SWAP_INGREDIENT_IN_CONSTRUCTOR,
    readonly dropIndex: number,
    readonly dragIndex: number
}

export interface IDeleteIngredientInConstructor {
    readonly type: typeof DELETE_INGREDIENT_IN_CONSTRUCTOR,
    readonly id: string
}

export interface IGetCurrentOrder {
    readonly type: typeof GET_CURRENT_ORDER
}

export interface IGetCurrentOrderFailed {
    readonly type: typeof GET_CURRENT_ORDER_FAILED
}

export interface IGetCurrentOrderSuccess {
    readonly type: typeof GET_CURRENT_ORDER_SUCCESS,
    readonly order: TOrder
}

export interface ISetCurrentOrder {
    readonly type: typeof SET_CURRENT_ORDER,
    readonly order: TOrder
}

export type TMainActions =
    | ISetTotalPrice
    | IGetIngredients
    | IGetIngredientsFailed
    | IGetIngredientsSuccess
    | ISetCurrentTab
    | IAddIngredientInConstructor
    | IGetOrder
    | IGetOrderSuccess
    | IGetOrderFailed
    | IGetCurrentOrderFailed
    | IGetCurrentOrderSuccess
    | ISetCurrentIngredient
    | ISwapIngredientsInConstructor
    | IDeleteIngredientInConstructor
    | ISetCurrentOrder
    | IGetCurrentOrder
    | IGetCurrentOrderFailed
    | IGetCurrentOrderSuccess;