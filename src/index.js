import React from 'react';
import './index.css';
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import registerServiceWorker from './registerServiceWorker';

/** register the wrapper (Root) which will 
 *  contain our provider and our routes
 */
ReactDOM.render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)

registerServiceWorker();
