import React from 'react'
import { Route, Router } from 'react-router'

import App from './containers/App'
import Categories from './containers/Categories'
import Posts from './components/Posts'
import PostDetails from './containers/PostDetails'
import { connect } from 'react-redux';
import PathNotFound from './containers/PathNotFound'

const Routes =  ({history}) => (
    <Router history={history}>
        <Route path="/silly" component={Posts} />
        <Route path="/category/:type" component={App} />
        <Route path="/postDetail/:postId" component={PostDetails} />
        <Route path="/" component={App} />
        <Route path="*" component={PathNotFound} />
    </Router>
)

export default Routes;