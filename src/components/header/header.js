import React, { Component } from 'react'
import { Icon, Modal, Input } from 'antd'

import './header.scss'

class Header extends Component {
  state = {
    visible: false
  }

  showDialog = () => {
    this.setState({
      visible: true
    })
  }

  onSure = e => {
    e.preventDefault()
    this.setState({
      visible: false
    })
  }

  onCancel = () => {
    this.setState({
      visible: false
    })
  }

  render() {
    return (
      <div className="m-Header">
        <h1 className="m-Header-title">在线音乐播放器</h1>
        <div className="m-Header-user" onClick={this.showDialog}>
          <Icon type="user" theme="outlined" />
          未登录
        </div>

        <Modal
          title="用户登录"
          visible={this.state.visible}
          onOk={this.onSure}
          onCancel={this.onCancel}
        />
      </div>
    )
  }
}

export default Header
