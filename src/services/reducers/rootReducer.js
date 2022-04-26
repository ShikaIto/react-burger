import { SET_TOTAL_PRICE, GET_INGREDIENTS, GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_SUCCESS, ACTIVE_INGREDIENT_DETAILS, INACTIVE_MODAL,
    ACTIVE_ORDER_DETAILS, SET_CURRENT_TAB, ADD_BUN_IN_CONSTRUCTOR,
    ADD_INGREDIENT_IN_CONSTRUCTOR, GET_ORDER, GET_ORDER_FAILED,
    GET_ORDER_SUCCESS } from "../actions/actions";

const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,

    constructorIngredients: [],
    count: [],
    bun: {},
    
    ingredientDetails: false,
    currentIngredient: {},

    orderDetails: false,
    order: {},
    orderRequest: false,
    orderFailed: false,

    buttonText: 'Оформить заказ',

    totalPrice: 0,

    currentTab: 'one'
}

export const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_BUN_IN_CONSTRUCTOR: {
            return {...state, bun: action.bun}
        }
        case ADD_INGREDIENT_IN_CONSTRUCTOR: {
            return {...state, constructorIngredients: action.ingredients}
        }
        case SET_CURRENT_TAB: {
            return {...state, currentTab: action.tab}
        }
        case SET_TOTAL_PRICE: {
            return {...state, totalPrice: action.totalPrice}
        }
        case ACTIVE_ORDER_DETAILS: {
            return {...state, orderDetails: true}
        }
        case ACTIVE_INGREDIENT_DETAILS: {
            return {...state, currentIngredient: action.ingredient, ingredientDetails: true}
        }
        case INACTIVE_MODAL: {
            return {...state, ingredientDetails: false, orderDetails: false, currentIngredient: {}}
        }
        case GET_INGREDIENTS: {
            return {...state, ingredientsRequest: true, ingredientsFailed: false}
        }
        case GET_INGREDIENTS_FAILED: {
            return {...state, ingredientsFailed: true, ingredientsRequest: false}
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {...state, ingredientsRequest: false, ingredients: action.ingredients, bun: action.bun}
        }
        case GET_ORDER: {
            return {...state, orderRequest: true, orderFailed: false, buttonText: 'Загрузка...'}
        }
        case GET_ORDER_SUCCESS: {
            return {...state, orderRequest: false, order: action.order, buttonText: 'Оформить заказ'}
        }
        case GET_ORDER_FAILED: {
            return {...state, orderRequest: false, orderFailed: true, buttonText: 'Оформить заказ'}
        }
        default: {
            return state;
        }
    }
}