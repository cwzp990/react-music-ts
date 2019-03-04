import React, { Component } from 'react'

import './mine.scss'

class Mine extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render () {
    const { mine } = this.props
    return (
      <div className={mine ? 'm-Mine' : 'm-Mine none'}>
        我是我的歌单
      </div>
    )
  }
}

export default Mine