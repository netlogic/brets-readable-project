import React from 'react'
import { Route } from 'react-router'
import App from './containers/App'
import Categories from './containers/Catoregies'
import Posts from './containers/Posts'
import PostDetail from './containers/PostDetail'

export default (
  <Route path="/" component={App}>
    <Route path="/:categories/:post_id"
           component={PostDetail} />
    <Route path="/:categories"
           component={Categories} />
  </Route>
)