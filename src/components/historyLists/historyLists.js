import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, List, Icon } from 'antd'
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

  play = (song) => {
    this.props.addPlay(song)
    this.props.addHistory(song)
  }

  render() {
    return (
      <div className="m-History">
        <Tabs type="card">
          <TabPane tab="播放列表" key="1">
            <List
              dataSource={this.state.playList}
              renderItem={item => (
                <List.Item
                  key={item.key}
                  className="m-History-song"
                  onClick={this.play.bind(this, item)}
                >
                  <List.Item.Meta
                    avatar={<Icon type="pause" className="m-History-avatar" />}
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
                  <List.Item.Meta
                    avatar={<Icon type="pause" className="m-History-avatar" />}
                    title={item.title}
                  />
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
  null,
  mapDispatchToProps
)(History)
