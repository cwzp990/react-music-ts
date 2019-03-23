import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, message } from 'antd'
import { setMyList } from '../../store/actions'

import './nav.scss'

class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  showDrawer = () => {
    if (JSON.stringify(this.props.userInfo) === '{}') {
      message.warning('需要先登录哦~')
      return false
    }
    this.props.setMyList(true)
  }

  render() {
    return (
      <div className="m-Nav">
        <Button size={'large'} onClick={this.showDrawer}>
          我的
        </Button>
        <Link to="/recommend">
          <Button size={'large'}>推荐</Button>
        </Link>
        <Link to="/songlist">
          <Button size={'large'}>歌单</Button>
        </Link>
        <Link to="/rank">
          <Button size={'large'}>排行</Button>
        </Link>
        <Link to="/singer">
          <Button size={'large'}>歌手</Button>
        </Link>
        <Link to="/search">
          <Button size={'large'}>搜索</Button>
        </Link>
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
  setMyList: status => {
    dispatch(setMyList(status))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav)
