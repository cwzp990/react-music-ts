import React, { Component } from 'react'
import { Icon, Modal, Form, Input } from 'antd'

import './header.scss'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
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

  handleSubmit = e => {
    e.preventDefault()
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
        >
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="username"
              />
            </Form.Item>
            <Form.Item>
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="password"
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default Header
