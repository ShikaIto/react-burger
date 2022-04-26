import { api } from "../../utils/constants";

export const SET_TOTAL_PRICE = 'SET_TOTAL_PRICE';

export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';

export const INACTIVE_MODAL = 'INACTIVE_MODAL';

export const ACTIVE_INGREDIENT_DETAILS = 'ACTIVE_INGREDIENT_DETAILS';

export const ACTIVE_ORDER_DETAILS = 'ACTIVE_ORDER_DETAILS';

export const GET_ORDER = 'GET_ORDER';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';

export const SET_CURRENT_TAB = 'SET_CURRENT_TAB';

export const ADD_INGREDIENT_IN_CONSTRUCTOR = 'ADD_INGREDIENT_IN_CONSTRUCTOR';
export const ADD_BUN_IN_CONSTRUCTOR = 'ADD_BUN_IN_CONSTRUCTOR';

export function getIngredients() {
    return function(dispatch) {
        dispatch({type: GET_INGREDIENTS});

        fetch(`${api}ingredients`)
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            return Promise.reject();
          }
        })
        .then(res => {
            if(res && res.success) {
              const bun = res.data.find(item => item.type === 'bun');
                dispatch({type: GET_INGREDIENTS_SUCCESS, ingredients: res.data, bun: bun});
            } else {
                dispatch({type: GET_INGREDIENTS_FAILED});
            }
        })
        .catch(err => {
            dispatch({type: GET_INGREDIENTS_FAILED});
        })
    }
}

export function getOrder(items) {
  return function(dispatch) {
    dispatch({type: GET_ORDER});

    fetch(`${api}orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'ingredients': items
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then(res => {
      if(res && res.success) {
        dispatch({type: GET_ORDER_SUCCESS, order: res.order.number});
        dispatch({type: ACTIVE_ORDER_DETAILS});
      } else {
        dispatch({type: GET_ORDER_FAILED});
      }
    })
    .catch(err => {
      console.log(err);
      dispatch({type: GET_ORDER_FAILED});
    })
  }
}


