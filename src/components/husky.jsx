'use strict'

import React from 'react'

require('../styles/husky')

class Husky extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <img src="../images/husky.jpg" className="husky-img" />
      </div>
    )
  }
}

export default Husky
