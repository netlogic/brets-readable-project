import React from 'react'
import { Route } from 'react-router'
// import { BrowserRouter } from 'react-router'
import App from './containers/App'
import Categories from './containers/Categories'
import Posts from './containers/Posts'
import PostDetails from './containers/PostDetails'

export default (
        <Route path="/" component={App}>
            <Route path="/:categories/:post_id"
                component={PostDetails} />
            <Route path="/:categories"
                component={Categories} />
        </Route>
)