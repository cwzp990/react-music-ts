import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, List } from 'antd'
import { addPlay, addHistory } from '../../store/actions'

import './historyLists.scss'

const TabPane = Tabs.TabPane

class History extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playList: [],
      historyList: []
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      playList: nextProps.playList,
      historyList: nextProps.historyList
    })
  }

  changeTab = (val, event) => {
    // 阻止原生事件上的冒泡
    event.nativeEvent.stopImmediatePropagation()
  }

  play = song => {
    this.props.addPlay(song)
    this.props.addHistory(song)
  }

  render() {
    const { currentIndex } = this.props

    return (
      <div className="m-History">
        <Tabs onTabClick={this.changeTab} type="card">
          <TabPane tab="播放列表" key="1">
            <List
              dataSource={this.state.playList}
              renderItem={(item, index) => (
                <List.Item
                  key={item.key}
                  className="m-History-song"
                  onClick={this.play.bind(this, item)}
                >
                  <List.Item.Meta
                    avatar={
                      <p
                        className={`m-History-avatar ${
                          currentIndex === index ? 'show' : ''
                        }`}
                      >
                        <i className="icon-play1 iconfont" />
                      </p>
                    }
                    title={item.title}
                  />
                  <div>{item.singer}</div>
                </List.Item>
              )}
            />
          </TabPane>
          <TabPane tab="历史纪录" key="2">
            <List
              dataSource={this.state.historyList}
              renderItem={item => (
                <List.Item
                  key={item.key}
                  className="m-History-song"
                  onClick={this.play.bind(this, item)}
                >
                  <List.Item.Meta title={item.title} />
                  <div>{item.singer}</div>
                </List.Item>
              )}
            />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

// 映射Redux全局的state到组件的props上 (接收)
const mapStateToProps = state => ({
  currentIndex: state.currentIndex
})

// 映射dispatch到props (发送)
const mapDispatchToProps = dispatch => ({
  addPlay: status => {
    dispatch(addPlay(status))
  },
  addHistory: status => {
    dispatch(addHistory(status))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(History)
