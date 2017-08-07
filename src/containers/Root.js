import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import routes from '../routes'
import { Router , useRouterHistory} from 'react-router'
import {createMemoryHistory} from 'history';

const appHistory = useRouterHistory(createMemoryHistory)({});

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={appHistory} routes={routes} />
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root
