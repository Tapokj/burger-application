import React, { Component } from 'react';
import { Route, Redirect }  from 'react-router-dom';

import { connect } from 'react-redux';

import * as actions from '../../store/actions';
//components
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData     from './ContactData/ContactData';

class Checkout extends Component {

  checkoutCancelled = () => {
    this.props.history.goBack();
  }

  checkoutContinue = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    let summary = <Redirect to='/'/>
    if ( this.props.ings ) {
      const purchaseRedirect = this.props.purchased ? <Redirect to='/'/> : null
      summary = (
        <div>
          {purchaseRedirect}
          <CheckoutSummary
            checkoutCancelled={this.checkoutCancelled}
            checkoutContinue={this.checkoutContinue}
            ingredients={this.props.ings}/>
          <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
        </div>

      );
    }
    return (
      <div>{summary}</div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased
  }
}



export default connect(mapStateToProps)(Checkout);
