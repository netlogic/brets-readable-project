import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import {routerMiddleware} from 'react-router-redux';

const configureStore = (history,preloadedState) => createStore(
  rootReducer,
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
   applyMiddleware(thunk,routerMiddleware(history))
)

export default configureStore
