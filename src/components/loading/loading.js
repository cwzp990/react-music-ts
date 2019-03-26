import React, { Component } from 'react'
import { Spin } from 'antd'

import './loading.scss'

class Loading extends Component {
  render() {
    return (
      <div className="m-Loading">
        <div className="m-Loading-wrapper">
          <Spin indicator={<i className="icon-loading iconfont" />} />
        </div>
      </div>
    )
  }
}

export default Loading
