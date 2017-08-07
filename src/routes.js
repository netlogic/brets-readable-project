import React from 'react'
import { Route, IndexRedirect } from 'react-router'
// import { BrowserRouter } from 'react-router'
import App from './containers/App'
import Categories from './containers/Categories'
import Posts from './containers/Posts'
import PostDetails from './containers/PostDetails'
import { connect } from 'react-redux';

const Routes  =  (
    <Route exact path="/" component={App}>
    <IndexRedirect to='/categories' />
        <Route exact path="/categories"
            component={Categories} />
        <Route path="/catergory/:type"
            component={PostDetails} />
        <Route path="/silly"
            component={PostDetails} />
    </Route>
)

export default Routes;

// export default connect(null, null)(Routes)