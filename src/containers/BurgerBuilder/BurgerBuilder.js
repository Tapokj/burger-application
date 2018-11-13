import React, { Component } from 'react';
//components
import Aux    from '../../hoc/Auuxz';
import Burger from '../../components/Burger/Burger';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal         from '../../components/UI/Modal/Modal';
import OrderSummary  from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner       from '../../components/UI/Spinner/Spinner';
//High Order Components
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios            from '../../axios-orders';
//Redux
import { connect }        from 'react-redux';
import * as burgerActions from '../../store/actions/index';


class BurgerBuilder extends Component {

  state = {
    purchasing: false
  }

  componentDidMount(){
    this.props.onInitIngredients()
  };

  purcaseHandler = () => {
    if ( this.props.isAuthenticated ) {
        this.setState({purchasing: true});
    } else {
      this.props.onSetAuthRedirectPath('/checkout')
      this.props.history.push('/auth')
    }
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase()
    this.props.history.push('/checkout')
  }

  updatePurchasable = (ingredients) => {

    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

      return sum > 0;
  }


  render () {
    const disabledInfo = {
      ...this.props.ings
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null
    let burger = this.props.error ? <p>Ingredients can't be loaded! </p> : <Spinner/>

    if ( this.props.ings ) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings}/>
          <BuildControls
            ordered={this.purcaseHandler}
            purchasable={this.updatePurchasable}
            price={this.props.price}
            disabled={disabledInfo}
            isAuth={this.props.isAuthenticated}
            ingredientAdded={this.props.onIngredientsAdded}
            ingredientRemoved={this.props.onIngredientsRemove} />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
            price={this.props.price}
            purchaseCancel={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            ingredients={this.props.ings}/>
      )
    }

    if ( this.state.loading ) {
      orderSummary = <Spinner/>
    }

    return (
      <Aux>
        <Modal modalClose={this.purchaseCancelHandler} show={this.state.purchasing}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  //Functions recieves dispatch wich recieve actionsCreator
  return {
    //Action Creator recieve value. We imported action creator from our store
    onIngredientsAdded:  ingName => dispatch(burgerActions.addingIngredient(ingName)),
    onIngredientsRemove: ingName => dispatch(burgerActions.removeIngredient(ingName)),
    onInitIngredients:   () => dispatch(burgerActions.initIngredients()),
    onInitPurchase: () => dispatch(burgerActions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(burgerActions.setAuthtRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
