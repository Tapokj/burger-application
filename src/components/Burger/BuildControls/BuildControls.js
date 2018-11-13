import React from 'react';

import './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  {label: 'Salad', 'type': 'salad'},
  {label: 'Bacon', 'type': 'bacon'},
  {label: 'Cheese', 'type': 'cheese'},
  {label: 'Meat', 'type': 'meat'},
]

const buildControls = (props) => (
  <div className='build-controls'>
    <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
    {controls.map(ctrl => {
      return <BuildControl
        disabled={props.disabled[ctrl.type]}
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
        key={ctrl.label}
        label={ctrl.label}/>
    })}
    <button
      onClick={props.ordered} disabled={!props.purchasable} 
      className='order-button'>{props.isAuth ? 'Order Now' : 'Sign Up To Order'}</button>
  </div>
);

export default buildControls;
