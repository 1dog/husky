'use strict'

import React from 'react'
import Router, {Route, DefaultRoute} from 'react-router'
import Layout from './components/layout'

import Home from './components/home'

var content = document.getElementById('content')

var routes = (
  <Route path="/" handler={Layout}>
    <DefaultRoute name="root" path="" handler={Home} />
  </Route>
)

Router.run(routes , function (Handler) {
  React.render(<Handler/>, content)
})
