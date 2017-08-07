import React from 'react';
import './index.css';
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import ReactNativeWeb from 'react-native-web';



import {
  createHistory,
} from 'history'

const historyObject =  browserHistory

const store = configureStore(historyObject)

const theHistory = syncHistoryWithStore(historyObject, store)

/** register the wrapper (Root) which will 
 *  contain our provider and our routes
 */
ReactNativeWeb.render(
  <Root store={store} history={theHistory} />,
  document.getElementById('root')
)