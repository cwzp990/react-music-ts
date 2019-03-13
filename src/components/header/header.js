import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Icon, Modal, Input, message } from 'antd'
import { setUserInfo } from '../../store/actions'
import { setToken } from '../../utils/cookie'
import { api } from '../../api/index'

import './header.scss'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      userInfo: {},
      isLogin: false,
      username: 18655323262,
      password: 'cwzp990.!'
    }
  }

  showDialog = () => {
    this.setState({
      visible: true
    })
  }

  showUserInfo = () => {
  }

  onSubmit = e => {
    e.preventDefault()
    const { username, password } = this.state
    if (!username) {
      message.warning('请输入账号!')
      return false
    }
    if (!password) {
      message.warning('请输入密码!')
      return false
    }
    this.login(username, password)
  }

  login = (username, password) => {
    api.getLoginCellphoneResource(username, password).then(res => {
      if (res.status === 200) {
        setToken('username', username) // 设置cookie
        setToken('password', password) // 设置cookie
        this.props.setUserInfo(res.data.profile) // 设置用户信息
        this.setState({
          userInfo: res.data.profile,
          isLogin: true
        })
        message.success(`欢迎您，${res.data.profile.nickname}~`)
        this.onCancel()
      } else {
        message.warning('登陆失败，请重试')
      }
    })
  }

  onCancel = () => {
    this.setState({
      visible: false
    })
  }

  handleChangeUser = e => {
    this.setState({
      username: e.target.value
    })
  }

  handleChangePwd = e => {
    this.setState({
      password: e.target.value
    })
  }

  render() {
    const { userInfo, isLogin } = this.state
    return (
      <div className="m-Header">
        <h1 className="m-Header-title">在线音乐播放器</h1>
        {
          isLogin ? (
            <div className="m-Header-user" onClick={this.showUserInfo}>
              <p className="m-Header-avatar">
                <img src={userInfo.avatarUrl} alt=""/>
              </p>
              <p>{userInfo.nickname}</p>
              <Icon type="caret-down" />
            </div>
          ) : (
            <div className="m-Header-user" onClick={this.showDialog}>
            <Icon type="user" theme="outlined" />
            未登录
          </div>
          )
        }


        <Modal
          title="用户登录"
          wrapClassName="m-Header-form"
          visible={this.state.visible}
          onOk={this.onSubmit}
          onCancel={this.onCancel}
        >
          <div>
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="username"
              className="form-username"
              value={this.state.username}
              onChange={this.handleChangeUser}
            />
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.handleChangePwd}
            />
          </div>
        </Modal>
      </div>
    )
  }
}

// 映射dispatch到props (发送)
const mapDispatchToProps = dispatch => ({
  setUserInfo: status => {
    dispatch(setUserInfo(status))
  }
})

export default connect(
  null,
  mapDispatchToProps
)(Header)
