import * as actionTypes from '../actions/actionTypes';

//state
const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
};

const PRICE_INGREDIENTS = {
  salad: 0.6,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

//reducer witch implement our functionallity
const reducer = (state = initialState, action) => {

  switch ( action.type ) {
    case actionTypes.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + PRICE_INGREDIENTS[action.ingredientName],
        building: true
      }
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        error: false,
        totalPrice: 4
      }
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      }
    case actionTypes.REMOVE_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - PRICE_INGREDIENTS[action.ingredientName],
        building: false
      }
    default:
      return state;
  }
}

export default reducer;
