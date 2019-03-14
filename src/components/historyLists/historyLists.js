import React, { Component } from 'react'
import { Tabs, List, Icon, Spin } from 'antd'

import './historyLists.scss'

const TabPane = Tabs.TabPane

class History extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playList: []
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      playList: nextProps.playList
    })
  }

  render() {
    return (
      <div className="m-History">
        <Tabs type="card">
          <TabPane tab="播放列表" key="1">
            <List
              dataSource={this.state.playList}
              renderItem={item => (
                <List.Item key={item.key}>
                  <List.Item.Meta
                    avatar={<Icon type="pause" className="m-History-avatar" />}
                    title={item.title}
                  />
                  <div>{item.singer}</div>
                </List.Item>
              )}
            >
              {this.state.loading && this.state.hasMore && (
                <div className="m-History-loading-container">
                  <Spin />
                </div>
              )}
            </List>
          </TabPane>
          <TabPane tab="历史纪录" key="2">
            Content of Tab Pane 2
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default History
