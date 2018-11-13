import React, { Component } from 'react';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Aux from '../../hoc/Auuxz';
import { connect } from 'react-redux';
import './Layout.css';

class Layout extends Component {

  state = {
    showSideDrawer: true
  }

  sideDrawerCloseHandler = () => {
    this.setState({showSideDrawer: false})
  }

  sideDrawerTogglerHandler = () => {
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer}
    })
  }

  render() {
    return (
      <Aux>
        <Toolbar
        isAuth={this.props.isAuthenticated}
        drawerToggleClicked={this.sideDrawerTogglerHandler}/>
        <SideDrawer
        isAut={this.props.isAuthenticated}
        open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler}/>
        <div className='content'>
           {this.props.children}
        </div>
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);
