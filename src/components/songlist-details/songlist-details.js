import React, { Component } from 'react'
import { connect } from 'react-redux'
import Tag from '../../components/tag/tag'
import Comment from '../../components/comment/comment'
import Loading from '../loading/loading'
import { Tabs, Table, Tooltip } from 'antd'
import { api } from '../../api/index'
import { fmtDate } from '../../utils/common'
import { toNormalizeList } from '../../utils/common'
import {
  setSong,
  setPlayingStatus,
  setPlayList,
  setSequenceList,
  setCurrentIndex,
  setMyList
} from '../../store/actions'

import './songlist-details.scss'

const TabPane = Tabs.TabPane

const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    width: 50
  },
  {
    title: '音乐标题',
    dataIndex: 'title',
    width: 250
  },
  {
    title: '歌手',
    dataIndex: 'singer',
    width: 250
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
      count: undefined
    }
  }

  componentDidMount() {
    this.getData()
  }

  // songlist/123 => songlist/456 需要在此生命周期里触发
  componentWillReceiveProps() {
    this.getData()
  }

  getData = () => {
    // 获取url参数
    console.log(this.props)
    api.getPlaylistDetailResource(this.props.match.params.id).then(res => {
      if (res.status === 200) {
        // 歌单列表格式化
        const songLists = toNormalizeList(res.data.playlist.tracks)
        this.setState({
          isLoading: true,
          details: res.data.playlist,
          songLists
        })
        // 关闭左侧抽屉
        this.props.setMyList(false)
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

  // tab页点击回调
  changeTab = tab => {
    if (tab === '2') {
      this.getCommentList()
    }
  }

  // 播放歌曲
  play = (song, index) => {
    this.props.setSong(song)
    this.props.setPlayingStatus(true)
    this.props.setPlayList(this.state.songLists)
    this.props.setSequenceList(this.state.songLists)
    this.props.setCurrentIndex(index)
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
                  <Tag title="标签:" category={details.tags} />
                </div>
                <div className="m-details-brief nowrap">
                  <Tooltip
                    placement="topLeft"
                    overlayClassName="brief-card"
                    title={details.description}
                  >
                    简介: {details.description}
                  </Tooltip>
                </div>
              </div>
            </div>
            <div className="m-Details-list">
              <Tabs onTabClick={this.changeTab}>
                <TabPane tab="歌曲列表" key="1">
                  <Table
                    size={'small'}
                    pagination={{ position: 'top', size: 'small' }}
                    columns={columns}
                    dataSource={this.state.songLists}
                    onRow={(record, rowkey) => {
                      return {
                        onClick: this.play.bind(this, record, rowkey) // record: 本行内容 rowkey：本行索引
                      }
                    }}
                  />
                </TabPane>
                <TabPane tab="评论" key="2">
                  <div className="m-Comment-container scrollbar">
                    <h3>精彩评论</h3>
                    <Comment commentList={this.state.hotComments} />
                    <h3>最新评论({this.state.count})</h3>
                    <Comment commentList={this.state.comments} />
                  </div>
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

// 映射dispatch到props (发送)
const mapDispatchToProps = dispatch => ({
  setSong: status => {
    dispatch(setSong(status))
  },
  setPlayingStatus: status => {
    dispatch(setPlayingStatus(status))
  },
  setPlayList: status => {
    dispatch(setPlayList(status))
  },
  setSequenceList: status => {
    dispatch(setSequenceList(status))
  },
  setCurrentIndex: status => {
    dispatch(setCurrentIndex(status))
  },
  setMyList: status => {
    dispatch(setMyList(status))
  }
})

export default connect(
  null,
  mapDispatchToProps
)(SonglistDetails)
