import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

/*
Action Creators do one simple think:

It imitates behavior of dispatch.It works like
funcion wich return object with type of action and
payload.
*/


//Functions recieves payload
export const addingIngredient = (name) => {
  //wich will return like property of our object
  return {
     type: actionTypes.ADD_INGREDIENTS,
     ingredientName: name
  }
}

export const removeIngredient = (name) => {

  return {
     type: actionTypes.REMOVE_INGREDIENTS,
     ingredientName: name
  }
}

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  }
}

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  }
}

export const initIngredients = () => {
  return dispatch => {
    axios.get('https://project-burg.firebaseio.com/ingredients.json')
      .then(response => {
        //this.setState({ingredients: response.data});
        dispatch(setIngredients(response.data))
      })
      .catch(error => {
        dispatch(fetchIngredientsFailed())
      })
  }
}
