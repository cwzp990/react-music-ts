import React, { Component } from 'react'
import { Icon, Slider } from 'antd'

import './bar.scss'

class Bar extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="m-Bar">
        <div className="m-Bar-playBtn">
          <Icon type="step-backward" theme="outlined" />
          <Icon type="caret-right" theme="outlined" className="btn-center" />
          <Icon type="step-forward" theme="outlined" />
        </div>
        <div className="m-Progress-wrapper">
          <Slider />
        </div>
        <div className="m-Bar-listBtn">
          <div className="m-Bar-sound">
            <Icon type="sound" theme="filled" />
            <Slider />
          </div>
          <Icon type="retweet" theme="outlined" className="btn-center" />
          <Icon type="bars" theme="outlined" />
        </div>
      </div>
    )
  }
}

export default Bar
