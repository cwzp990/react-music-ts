import React, { Component } from 'react'
import { Drawer, Tabs, Table } from 'antd'
import { api } from '../../api/index'
import './mine.scss'

const TabPane = Tabs.TabPane

const playColumns = [
  {
    title: '序号',
    dataIndex: 'index'
  },
  {
    title: '音乐标题',
    dataIndex: 'title'
  },
  {
    title: '歌手',
    dataIndex: 'singer'
  },
  {
    title: '专辑',
    dataIndex: 'album'
  }
]

const historyColumns = [
  {
    title: '序号',
    dataIndex: 'index'
  },
  {
    title: '音乐标题',
    dataIndex: 'title'
  },
  {
    title: '歌手',
    dataIndex: 'singer'
  },
  {
    title: '专辑',
    dataIndex: 'album'
  }
]

class PlayList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: true,
      playList: [],
      historyList: []
    }
  }

  onClose = () => {
    this.setState({
      visible: false
    })
  }

  // tab页点击回调
  changeTab = tab => {
    if (tab === '1') {
      this.getPlayList()
    } else {
      this.getHistoryList()
    }
  }

  getPlayList = () => {
  }

  getHistoryList = () => {
  }

  render() {
    return (
      <Drawer
        placement="right"
        width="17%"
        closable={false}
        onClose={this.onClose}
        visible={this.state.visible}
      >
        <Tabs onTabClick={this.changeTab} type="card">
          <TabPane tab="播放列表" key="1">
            <Table columns={playColumns} dataSource={this.state.playLists} />
          </TabPane>
          <TabPane tab="历史纪录" key="2">
            <Table columns={historyColumns} dataSource={this.state.historyLists} />
          </TabPane>
        </Tabs>
      </Drawer>
    )
  }
}

export default PlayList
