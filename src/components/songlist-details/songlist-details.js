import React, { Component } from 'react'
import Tag from '../../components/tag/tag'
import Loading from '../loading/loading'
import { Tabs, Table } from 'antd'
import { api } from '../../api/index'
import { fmtDate, formatDuring } from '../../utils/common'

import './songlist-details.scss'

const TabPane = Tabs.TabPane

const columns = [
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

class SonglistDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      details: {}, // 歌单详情数据
      list: [],
      selectedRowKeys: []
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    // console.log(this.props) 获取url参数
    api.getPlaylistDetailResource(this.props.match.params.id).then(res => {
      if (res.status === 200) {
        const list = res.data.playlist.tracks.map((item, index) => {
          let singer = ''
          item.ar.forEach(i => {
            singer += i.name + '/'
          })
          singer = singer.slice(0, -1)
          return {
            index: index + 1,
            singer,
            title: item.name,
            album: item.al.name,
            picUrl: item.al.picUrl,
            key: item.id
          }
        })
        this.setState({
          isLoading: true,
          details: res.data.playlist,
          list
        })
      }
    })
  }

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys })
  }

  render() {
    const { details, selectedRowKeys } = this.state

    // 全选
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    }

    return (
      <div className="m-SonglistDetails">
        {this.state.isLoading ? (
          <div className="m-Details-wrapper">
            <div className="m-Details-header">
              <div className="m-Details-cover">
                <img src={details.coverImgUrl} />
              </div>
              <div className="m-details-info">
                <h3 className="m-details-info-title">
                  <p className="m-details-info-name">{details.name}</p>
                  <div className="m-details-info-count">
                    <p className="info-count">
                      <span>歌曲数</span>
                      <span>{details.tracks.length}</span>
                    </p>
                    <p className="info-count">
                      <span>播放数</span>
                      <span>{details.playCount}</span>
                    </p>
                  </div>
                </h3>
                <div className="m-details-info-author">
                  <div className="author-avatar">
                    <div className="author-avatar-wrapper">
                      <img src={details.creator.avatarUrl} />
                    </div>
                    <p className="author-name">{details.creator.nickname}</p>
                  </div>
                  <p className="author-createTime">
                    {fmtDate(details.createTime)}
                  </p>
                </div>
                <div className="m-details-info-tag">
                  <Tag title="标签" category={details.tags} />
                </div>
                <div>
                  <span className="title">简介: </span>
                  <span className="m-details-brief">{details.description}</span>
                </div>
              </div>
            </div>
            <div className="m-Details-list">
              <Tabs>
                <TabPane tab="歌曲列表" key="1">
                  <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={this.state.list}
                  />
                </TabPane>
                <TabPane tab="评论" key="2">
                  Content of Tab 2
                </TabPane>
              </Tabs>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    )
  }
}

export default SonglistDetails
