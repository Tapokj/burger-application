import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect }    from 'react-router-dom';
import { connect }          from 'react-redux';

//components
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout      from './containers/Checkout/Checkout';
import Orders        from './containers/Orders/Orders';
import Layout        from './components/Layout/Layout';
import Auth          from './containers/Auth/Auth';
import Logout        from './containers/Auth/Logout/Logout';

import * as actions from './store/actions/index';
//styles
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  componentDidMount(){
    this.props.onAutoSignup()
  }

  render() {
    let routes = (
      <Switch>
        <Route path='/auth' component={Auth}/>
        <Route path='/' exact component={BurgerBuilder}/>
        <Redirect to='/'/>
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/auth' component={Auth}/>
          <Route path='/checkout' component={Checkout}/>
          <Route path='/orders' component={Orders}/>
          <Route path='/logout' component={Logout}/>
          <Route path='/' exact component={BurgerBuilder}/>
          <Redirect to='/'/>
        </Switch>
      );
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAutoSignup: () => dispatch(actions.authCheckState())
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
