import React from 'react';

//import { withRouter }  from 'react-router-dom';
import BurgerIngridients from './BurgerIngridients/BurgerIngridients';
//styles
import './Burger.css';

const burger = (props) => {

  let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
      return [...Array( props.ingredients[igKey] )].map((_, i) => {
        return <BurgerIngridients key={igKey + i} type={igKey} />
      })
    })
  .reduce((arr, el) => {
    return arr.concat(el)
  }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingedients!</p>
  }

  return (
    <div className='burger'>
      <BurgerIngridients type='bread-top'/>
      {transformedIngredients}
      <BurgerIngridients type='bread-bottom'/>
    </div>
  );
}

export default burger;
