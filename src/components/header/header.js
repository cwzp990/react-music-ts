import React, { Component } from 'react'

import './header.scss'

class Header extends Component {
  render() {
    return (
      <div className="m-Header">
        <h1 className="m-Header-title">在线音乐播放器</h1>
        <div className="m-Header-user">用户信息模块</div>
      </div>
    )
  }
}

export default Header
