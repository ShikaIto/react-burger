import { SET_TOTAL_PRICE, GET_INGREDIENTS, GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_SUCCESS, SET_CURRENT_TAB,
    ADD_INGREDIENT_IN_CONSTRUCTOR, GET_ORDER, GET_ORDER_FAILED,
    GET_ORDER_SUCCESS, SET_CURRENT_INGREDIENT, SWAP_INGREDIENT_IN_CONSTRUCTOR,
    DELETE_INGREDIENT_IN_CONSTRUCTOR, GET_CURRENT_ORDER, GET_CURRENT_ORDER_FAILED,
    GET_CURRENT_ORDER_SUCCESS, SET_CURRENT_ORDER } 
    from "../actions/main";

const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,

    constructorIngredients: [],
    count: [],

    currentIngredient: false,
    currentOrder: false,

    currentOrderRequest: false,
    currentOrderFailed: false,

    order: 0,
    orderRequest: false,
    orderFailed: false,

    totalPrice: 0,

    currentTab: 'one'
}

export const main = (state = initialState, action) => {
    switch(action.type) {
        case DELETE_INGREDIENT_IN_CONSTRUCTOR: {
            const arr = [...state.constructorIngredients];
            const index = arr.findIndex(el => el.id === action.id);
            arr.splice(index, 1);
            return {...state, constructorIngredients: arr}
        }
        case SWAP_INGREDIENT_IN_CONSTRUCTOR: {
            const arr = [...state.constructorIngredients];
            const item = arr[action.dragIndex]
            arr[action.dragIndex] = arr[action.dropIndex];
            arr[action.dropIndex] = item;
            return {...state, constructorIngredients: arr}
        }

        case SET_CURRENT_INGREDIENT: {
            return {...state, currentIngredient: action.ingredient}
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

        case GET_INGREDIENTS: {
            return {...state, ingredientsRequest: true, ingredientsFailed: false}
        }
        case GET_INGREDIENTS_FAILED: {
            return {...state, ingredientsFailed: true, ingredientsRequest: false}
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {...state, ingredientsRequest: false, ingredients: action.ingredients}
        }

        case GET_ORDER: {
            return {...state, orderRequest: true, orderFailed: false}
        }
        case GET_ORDER_SUCCESS: {
            return {...state, orderRequest: false, order: action.order, constructorIngredients: []}
        }
        case GET_ORDER_FAILED: {
            return {...state, orderRequest: false, orderFailed: true}
        }

        case GET_CURRENT_ORDER: {
            return {...state, currentOrderRequest: true, currentOrderFailed: false}
        }
        case GET_CURRENT_ORDER_SUCCESS: {
            return {...state, currentOrderRequest: false, currentOrder: action.order}
        }
        case GET_CURRENT_ORDER_FAILED: {
            return {...state, currentOrderRequest: false, currentOrderFailed: true}
        }
        case SET_CURRENT_ORDER: {
            return {...state, currentOrder: action.order}
        }

        default: {
            return state;
        }
    }
}