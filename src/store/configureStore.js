import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import api from '../middleware/api'
import rootReducer from '../reducers'
import {browserHistory} from 'react-router';
import {routerMiddleware} from 'react-router-redux';

const configureStore = preloadedState => createStore(
  rootReducer,
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk, api,routerMiddleware(browserHistory))
)

export default configureStore
