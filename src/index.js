import React             from 'react';
import ReactDOM          from 'react-dom';
//Redux
import { Provider }      from 'react-redux';
import thunk             from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers  }   from 'redux';
//React Router
import { BrowserRouter } from 'react-router-dom';
//styles
import './index.css';
//components
import App from './App';
//serviceWorker
import * as serviceWorker from './serviceWorker';
//App component wrapped in BrowserRouter and Provider (Redux)
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer         from './store/reducers/order';
import authReducer          from './store/reducers/auth';

//We create const wich store redux devtools extension
const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer
})

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
//We create store wich have createStore func with two params
//1 - reducer. 2 - our const with extension
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
