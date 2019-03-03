import React, { Component } from 'react'
import { Spin, Icon } from 'antd'

import './loading.scss'

class Loading extends Component {
  render() {
    const antIcon = <Icon type="loading" style={{ fontSize: 40 }} spin />
    return (
      <div className="m-Loading">
        <div className="m-Loading-wrapper">
          <Spin indicator={antIcon} />
        </div>
      </div>
    )
  }
}

export default Loading
