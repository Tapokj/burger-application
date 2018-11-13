import React, { PureComponent } from 'react';
//Redux
import { connect }  from 'react-redux';
import * as actions from '../../../store/actions/index';
//components
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button  from '../../../components/UI/Button/Button';
import axios   from '../../../axios-orders';
import Input   from '../../../components/UI/Input/Input'
//styles
import './ContactData.css';
//hoc
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

class ContactData extends PureComponent {

  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Street',
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'number',
          placeholder: 'Zip Code',
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Country',
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email',
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
        ]
        },
        value: 'cheapest',
        validation: {},
        valid: true,
        touched: false
      },
    },
    isValid: false
  }

  checkValidity(value, rules) {
      let isValid = true;
      if (!rules) {
          return true;
      }

      if (rules.required) {
          isValid = value.trim() !== '' && isValid;
      }

      if (rules.minLength) {
          isValid = value.length >= rules.minLength && isValid
      }

      if (rules.maxLength) {
          isValid = value.length <= rules.maxLength && isValid
      }

      if (rules.isEmail) {
          const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
          isValid = pattern.test(value) && isValid
      }

      if (rules.isNumeric) {
          const pattern = /^\d+$/;
          isValid = pattern.test(value) && isValid
      }

      return isValid;
  }

  orderHandler = (e) => {
    e.preventDefault();

    const formData = {};
    for ( let formElementIndex in this.state.orderForm ) {
      formData[formElementIndex] = this.state.orderForm[formElementIndex].value
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId
    }

    this.props.onOrderBurger(order, this.props.token)

  }

  inputChangeHandler = (e, inputIndex) => {
    //we can't change original state
    const updatedOrderForm = {
      ...this.state.orderForm
    }
    //clone of selected element
    const updatedFormElement = {
      ...updatedOrderForm[inputIndex]
    }
    //value should equals to value wich user input in field
    updatedFormElement.value = e.target.value;
    //check validation with our custom function
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    //change our selected field
    updatedOrderForm[inputIndex] = updatedFormElement;
    let formIsValid = true;

    for (let inputIndex in updatedFormElement) {
      formIsValid = updatedFormElement[inputIndex].valid && formIsValid;
    }
    //change our state
    this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid})
  }

  render() {
    const formElementsArray = [];

    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => {
          return (
            <Input
              id={formElement.id}
              label={formElement.id}
              labelText={formElement.config.elementConfig.placeholder}
              key={formElement.id}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              changed={(e) => this.inputChangeHandler(e, formElement.id)}
              value={formElement.config.value}
              touched={formElement.config.touched}
              elementConfig={formElement.config.elementConfig}
              elementType={formElement.config.elementType}/>
          )
        })}
        <Button disabled={this.state.formIsValid} clazz='success'>Success</Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner/>
    }
    return (
      <div className='contact-data'>
        <h4>Enter Your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
