import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auuxz';

const withErrorHandler = (WrapperComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }

    componentDidMount(){
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({error: null})
        return req;
      });

      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({error: error})
      })
    }

    componentWillUnmnount(){
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmHandler = () => {
      this.setState({error: null})
    }

    render () {
      return (
        <Aux>
          <Modal clicked={this.errorConfirmHandler} show={this.state.error}>
            {this.state.error ? this.state.error.message: null}
          </Modal>
          <WrapperComponent {...this.props} />
        </Aux>
      )
    }
  }
}

export default withErrorHandler;
