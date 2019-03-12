import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Drawer, Icon } from 'antd'
import { api } from '../../api/index'
import { setMyList } from '../../store/actions'

import './mine.scss'

class Mine extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      userId: undefined || 88905019,
      currentIndex: -1,
      myList: []
    }
  }

  static contextTypes = {
    router: PropTypes.object
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

  selectedList = (item, index) => {
    this.setState({
      currentIndex: index
    })
    this.context.router.history.push(`/songlist/${item.id}`)
  }

  render() {
    const IconFont = Icon.createFromIconfontCN({
      scriptUrl: '//at.alicdn.com/t/font_831982_tcb8ha10fpr.js'
    })

    return (
      <Drawer
        title="我的歌单"
        placement="left"
        width="17%"
        className="m-Mine-songlist"
        closable={false}
        onClose={this.onClose}
        visible={this.props.showMine}
      >
        {this.state.myList.map((list, index) => {
          return (
            <p
              key={list.id}
              className={`nowrap m-Mine-title ${this.state.currentIndex == index ? 'selected' : ''}`}
              onClick={this.selectedList.bind(this, list, index)}
            >
              <span className="m-Mine-icon">
                <IconFont type="icon-music" />
              </span>
              <span>{list.name}</span>
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
