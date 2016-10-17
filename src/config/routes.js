import React from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import Main from '../components/Main'
import HomeContainer from '../containers/HomeContainer'
import SearchInput from '../components/SearchInput'
import About from '../components/About'

const routes = (
    <Router history={hashHistory}>
        <Route path='/' component={Main}>
            <IndexRoute component={HomeContainer}/>
            <Route path='search' header='Search' component={SearchInput} />
            <Route path='about' header='About' component={About} />
        </Route>
    </Router>
);
//<Route path='board' header='Massage-Time Board' component={Board} />
export default routes;