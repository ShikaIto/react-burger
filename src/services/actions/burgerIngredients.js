import { api } from "../../utils/constants";
export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';

export const INACTIVE_MODAL = 'INACTIVE_MODAL';

export const ACTIVE_INGREDIENT_DETAILS = 'ACTIVE_INGREDIENT_DETAILS';

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