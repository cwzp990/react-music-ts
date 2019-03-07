import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Drawer } from 'antd'
import { api } from '../../api/index'
import { setMyList } from '../../store/actions'

import './mine.scss'

class Mine extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      userId: undefined || 88905019,
      myList: []
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    api.getUserPlaylistResource(this.state.userId).then(res => {
      if (res.status === 200) {
        this.setState({
          myList: res.data.playlist
        })
      }
    })
  }

  onClose = () => {
    this.props.setMyList(false)
  }

  render() {
    return (
      <Drawer
        title="我的歌单"
        placement="left"
        width="17%"
        closable={false}
        onClose={this.onClose}
        visible={this.props.showMine}
      >
        {this.state.myList.map(list => {
          return (
            <p key={list.id} className="nowrap m-Mine-title">
              {list.name}
            </p>
          )
        })}
      </Drawer>
    )
  }
}

// 映射Redux全局的state到组件的props上 (接收)
const mapStateToProps = state => ({
  showMine: state.showMine
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
)(Mine)
