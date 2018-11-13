import React from 'react';

import './Input.css';

const input = props => {

  let inputElement = null;

  let clazzInput = ['form-control']

  if ( props.invalid && props.shouldValidate && props.touched ) {
    clazzInput.push('is-invalid')
  }

  switch (props.elementType) {
    case ('input'):
        inputElement = <input
          onChange={props.changed}
          className={clazzInput.join(' ')} {...props.elementConfig} value={props.value} />
        break;
    case ('textarea'):
        inputElement = <textarea
          onChange={props.changed}
          className={clazzInput.join(' ')} {...props.elementConfig} value={props.value} />
        break;

    case ('select'):
        inputElement = (
          <select
            onChange={props.changed}
            className={clazzInput.join(' ')}  value={props.value}>
            {props.elementConfig.options.map(option => {
              return (
                <option key={option.value} value={option.value}>
                  {option.displayValue}
                </option>
              )
            })}
          </select>
        )
        break
    default:
        inputElement = <input
          onChange={props.changed}
          className={clazzInput.join(' ')} {...props.elementConfig} value={props.value} />
  }
  return (
    <div className='form-group'>
      <label htmlFor={props.label}>{props.labelText}</label>
      {inputElement}
    </div>
  )

}

export default input;
