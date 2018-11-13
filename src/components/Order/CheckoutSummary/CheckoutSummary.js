import React from 'react';

//components
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
//styles
import './CheckoutSummary.css';

const checkoutSummary = (props) => {
  return (
    <div className='checkout-summary'>
      <h1>We hope it tastes well!</h1>
      <div className='checkout-burg'>
          <Burger ingredients={props.ingredients}/>
      </div>
      <div className='btn-box'>
        <Button clicked={props.checkoutCancelled} clazz='danger'>Cancel</Button>
        <Button clicked={props.checkoutContinue} clazz='success'>Continue</Button>
      </div>
    </div>
  )
}

export default checkoutSummary
