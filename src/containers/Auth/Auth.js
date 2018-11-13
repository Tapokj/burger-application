import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

//UI Components
import Input   from '../../components/UI/Input/Input';
import Button  from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
//Redux Actions & Connect
import * as actions from '../../store/actions/index';
import { connect }  from 'react-redux';


class Auth extends Component {

  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 7
        },
        valid: false,
        touched: false
      },
    },
    isSignup: true
  }

  componentDidMount(){
    if (this.props.buildingBurg && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  }

  checkValidity(value, rules){
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

  inputChangeHandler = (e, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: e.target.value,
        valid: this.checkValidity(e.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    }
    this.setState({controls: updatedControls})
  }

  submitHandler = (e) => {
    e.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value, //email
      this.state.controls.password.value, //password
      this.state.isSignup //signup
    )}

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {isSignup: !prevState.isSignup}
    })
  }

  render(){
    const formElementsArray = [];

    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      })
    }

    let form = formElementsArray.map(formElement => (
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
    ));

    if ( this.props.loading ) {
      form = <Spinner/>
    }

    let errorMessage = null;

    if ( this.props.error ) {
      errorMessage = (
        <div className='alert alert-danger'>
          <strong>{this.props.error.message}</strong>
        </div>
      )
    }

    let authRedirect = null;
    if ( this.props.isAuthenticated ) {
      authRedirect = <Redirect to={this.props.authRedirectPath}/>
    }

    return (
      <div className="auth container col-md-6">
        {authRedirect}
        <form onSubmit={this.submitHandler}>
          {errorMessage}
          {form}
            <Button clazz='success'>Submit</Button>
        </form>
        <Button
          clicked={this.switchAuthModeHandler}
          clazz='link'>Switch To {this.state.isSignup ? 'Sign in' : 'Sign up'}</Button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurg: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: ( email, password, isSignup ) => dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthtRedirectPath('/'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
