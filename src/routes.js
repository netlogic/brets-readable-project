import React from 'react'
import { Route, Router } from 'react-router'

import App from './containers/App'
import AddPost from './containers/AddPost'
import EditPost from './containers/EditPost'
import PostDetails from './containers/PostDetails'
import PathNotFound from './containers/PathNotFound'

const Routes =  ({history}) => (
    <Router history={history}>
        <Route path="/addPost" component={AddPost} />        
        <Route path="/editPost/:postId" component={EditPost} />
        <Route path="/:category/:postId" component={PostDetails}/>
        <Route path="/:category" component={App}/>
        <Route path="/" component={App} />
        <Route path="*" component={PathNotFound} />
    </Router>
)

export default Routes;