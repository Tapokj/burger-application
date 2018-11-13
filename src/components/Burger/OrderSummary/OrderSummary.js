import React from 'react';

import Aux from '../../../hoc/Auuxz';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
  const ingredientSummry = Object.keys(props.ingredients).map(cey => {
    return (
    <li key={cey}>
      <span style={{textTransform: 'capitalize'}}>{cey}</span> : {props.ingredients[cey]}
    </li>
  );
  })
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients: </p>
      <ul>
        {ingredientSummry}
      </ul>
      <p>Total Price: <strong>{props.price.toFixed(2)}</strong></p>
      <p>Continue to Chechout?</p>
      <div className='row'>
        <Button clazz='danger ml-3' clicked={props.purchaseCancel}>CANCEL</Button>
        <Button clazz='success ml-3' clicked={props.purchaseContinue}>SUCCESS</Button>
      </div>
    </Aux>
  )
}
export default OrderSummary;
