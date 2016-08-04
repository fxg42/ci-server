import Dashboard from './dashboard'
import React, { PropTypes } from 'react'
import { Router, Route, browserHistory } from 'react-router'

const Root = () =>
  <Router history={ browserHistory }>
    <Route path='/(:projectId)' component={Dashboard} />
  </Router>

export default Root
