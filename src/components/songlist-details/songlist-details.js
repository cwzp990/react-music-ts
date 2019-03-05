import React, { Component } from 'react'
import Tag from '../../components/tag/tag'
import Comment from '../../components/comment/comment'
import Loading from '../loading/loading'
import { Tabs, Table } from 'antd'
import { api } from '../../api/index'
import { fmtDate } from '../../utils/common'

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
      songLists: [],
      comments: [],
      hotComments: [],
      count: undefined,
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
        const songLists = res.data.playlist.tracks.map((item, index) => {
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
          songLists
        })
      }
    })
  }

  getCommentList = () => {
    api.getPlaylistCommentResource(this.props.match.params.id).then(res => {
      if (res.status === 200) {
        this.setState({
          comments: res.data.comments,
          count: res.data.total,
          hotComments: res.data.hotComments
        })
      }
    })
  }

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys })
  }

  // tab页点击回调
  changeTab = tab => {
    if (tab === '2') {
      this.getCommentList()
    }
  }

  render() {
    const { details } = this.state

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
              <Tabs onTabClick={this.changeTab}>
                <TabPane tab="歌曲列表" key="1">
                  <Table columns={columns} dataSource={this.state.songLists} />
                </TabPane>
                <TabPane tab="评论" key="2">
                  <h3>精彩评论</h3>
                  <Comment commentList={this.state.hotComments} />
                  <h3>最新评论({this.state.count})</h3>
                  <Comment commentList={this.state.comments} />
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
