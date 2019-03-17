import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Icon, Modal, Input, message, Avatar } from 'antd'
import { setUserInfo } from '../../store/actions'
import { setToken, removeToken } from '../../utils/cookie'
import { api } from '../../api/index'

import './header.scss'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      showInfo: false,
      username: '',
      password: ''
    }
  }

  componentDidMount () {
    this.bindEvents()
  }

  componentWillUnmount() {
    this.unbindEvents()
  }

  // 添加绑定事件
  bindEvents = () => {
    document.addEventListener('click', this.closeUserInfo, false)
  }

  // 移除绑定事件
  unbindEvents = () => {
    document.removeEventListener('click', this.closeUserInfo, false)
  }

  showDialog = () => {
    this.setState({
      visible: true
    })
  }

  showUserInfo = e => {
    e.nativeEvent.stopImmediatePropagation()
    this.setState({
      showInfo: true
    })
  }

  closeUserInfo = () => {
    this.setState({
      showInfo: false
    })
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
        setToken('userInfo', res.data.profile)
        this.props.setUserInfo(res.data.profile) // 设置用户信息
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

  logOut = () => {
    api.getLogout().then(res => {
      if (res.status === 200) {
        removeToken('userInfo')
        this.props.setUserInfo({})
        this.setState({
          showInfo: false
        })
        message.success('已退出登录')
      } else {
        message.warning('登出失败，请重试')
      }
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
    const { showInfo } = this.state
    const { userInfo } = this.props
    const IconFont = Icon.createFromIconfontCN({
      scriptUrl: '//at.alicdn.com/t/font_831982_2jm03atr9f.js'
    })

    return (
      <div className="m-Header">
        <h1 className="m-Header-title">React音乐播放器</h1>
        {userInfo.userId ? (
          <div className="m-Header-user" onClick={this.showUserInfo}>
            <p className="m-Header-avatar">
              <Avatar size={25} src={userInfo.avatarUrl} />
            </p>
            <p>{userInfo.nickname}</p>
            <Icon type="caret-down" />
          </div>
        ) : (
          <div className="m-Header-user" onClick={this.showDialog}>
            <Icon type="user" theme="outlined" />
            未登录
          </div>
        )}

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

        <div className={`m-Header-userInfo ${showInfo ? 'show' : 'none'}`}>
          <div className="m-Header-avatar">
            <p className="m-Header-info">
              <Avatar size={50} src={userInfo.avatarUrl} />
              <span className="m-Header-name">{userInfo.nickname}</span>
            </p>
            <p className="sign-in" onClick={this.signIn}>
              签到
            </p>
          </div>
          <div className="m-Header-update">
            <p className="updates">
              <span className="important">{userInfo.eventCount}</span>
              <span>动态</span>
            </p>
            <p className="updates">
              <span className="important">{userInfo.follows}</span>
              <span>关注</span>
            </p>
            <p className="updates">
              <span className="important">{userInfo.followeds}</span>
              <span>粉丝</span>
            </p>
          </div>
          <p className="logout" onClick={this.logOut}>
            <IconFont type="icon-close" className="icon-close" />
            <span>退出登录</span>
          </p>
        </div>
      </div>
    )
  }
}

// 映射Redux全局的state到组件的props上 (接收)
const mapStateToProps = state => ({
  userInfo: state.userInfo
})

// 映射dispatch到props (发送)
const mapDispatchToProps = dispatch => ({
  setUserInfo: status => {
    dispatch(setUserInfo(status))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
