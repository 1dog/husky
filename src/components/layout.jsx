'use strict'

import React from 'react'
import {RouteHandler} from 'react-router'

require('../styles/main')

class Layout extends React.Component {

  render() {
    return (
      <div>
        <RouteHandler />
      </div>
    )
  }
}

export default Layout
