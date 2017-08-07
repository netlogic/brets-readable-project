import React from 'react'
import { Route, Router } from 'react-router'

import App from './containers/App'
import Categories from './containers/Categories'
import Posts from './containers/Posts'
import PostDetails from './containers/PostDetails'
import { connect } from 'react-redux';

const Routes =  ({history}) => (
    <Router history={history}>
        <Route path="/silly" component={Posts} />
        <Route path="/catergory/:type" component={PostDetails} />
        <Route path="/categories" component={Categories} />
        <Route path="/" component={App} />
    </Router>
)

export default Routes;