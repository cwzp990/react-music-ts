import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, Tooltip, Avatar, List } from 'antd'
import InfiniteScroll from 'react-infinite-scroller'
import Tag from '../../../components/tag/tag'
import Loading from '../../../components/loading/loading'
import { api } from '../../../api/index'
import {
  fmtDate,
  formatTime,
  toLocalTime,
  toNormalizeList
} from '../../../utils/common'
import { setMyList, setAllPlay, addHistory } from '../../../store/actions'

import './songlist-details.scss'

const TabPane = Tabs.TabPane

class SonglistDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      loading: false, // 评论
      hasMore: true, // 评论
      offset: 1, // 分页
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
    api
      .getPlaylistCommentResource(this.props.match.params.id, this.state.offset)
      .then(res => {
        let comments = this.state.comments.concat(res.data.comments)
        let hotComments = this.state.hotComments.concat(res.data.hotComments)
        if (res.status === 200) {
          this.setState({
            comments,
            hotComments,
            count: res.data.total,
            hasMore: res.data.more,
            loading: true
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
    this.props.setAllPlay({
      playList: this.state.songLists,
      currentIndex: index
    })
    this.props.addHistory(song)
  }

  onLoad = () => {
    let offset = this.state.offset + 1
    this.setState({
      loading: false,
      offset
    })
    if (!this.state.hasMore) {
      this.setState({
        loading: true,
        hasMore: false
      })
      return false
    }
    this.getCommentList()
  }

  render() {
    const { details, isLoading } = this.state

    return (
      <div className="m-SonglistDetails">
        {isLoading ? (
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
                      {details.creator.avatarUrl ? (
                        <Avatar size={30} src={details.creator.avatarUrl} />
                      ) : (
                        <Avatar size={30} shape="square" icon="user" />
                      )}
                    </div>
                    <p className="author-name">{details.creator.nickname}</p>
                  </div>
                  <p className="author-createTime">
                    {fmtDate(details.createTime)}
                  </p>
                </div>
                <div className="m-details-info-tag">
                  <Tag
                    title="标签:"
                    show={false}
                    forbid={true}
                    category={details.tags}
                  />
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
            <div className="m-Details-SongList">
              <Tabs onTabClick={this.changeTab}>
                <TabPane tab="歌曲列表" key="1">
                  <div className="m-SongList-scroll">
                    <List
                      header={
                        <div className="m-Details-songItem">
                          <p className="item-song">序号</p>
                          <p className="item-song">音乐标题</p>
                          <p className="item-song">歌手</p>
                          <p className="item-song">专辑</p>
                          <p className="item-song">时长</p>
                        </div>
                      }
                      dataSource={this.state.songLists}
                      renderItem={item => (
                        <List.Item
                          key={item.key}
                          className="m-Details-songItem"
                          onClick={this.play.bind(this, item, item.index - 1)}
                        >
                          <p className="item-song">{item.index}</p>
                          <p className="item-song">{item.title}</p>
                          <p className="item-song">{item.singer}</p>
                          <p className="item-song">{item.album}</p>
                          <p className="item-song">
                            {formatTime(item.duration / 1000)}
                          </p>
                        </List.Item>
                      )}
                    />
                  </div>
                </TabPane>
                <TabPane tab="评论" key="2">
                  <div className="m-Comment-container">
                    <h3 className="m-Comment-title">
                      最新评论({this.state.count})
                    </h3>
                    <div className="m-Comment-scroll">
                      <InfiniteScroll
                        initialLoad={false}
                        pageStart={0}
                        loadMore={this.onLoad}
                        hasMore={!this.state.loading && this.state.hasMore}
                        useWindow={false}
                      >
                        <List
                          dataSource={this.state.comments}
                          renderItem={comment => (
                            <List.Item
                              key={comment.commentId}
                              actions={[
                                <p className="liked-count">
                                  <i className="icon-like iconfont" />
                                  {comment.likedCount}
                                </p>
                              ]}
                            >
                              <List.Item.Meta
                                avatar={<Avatar src={comment.user.avatarUrl} />}
                                title={
                                  <div>
                                    <div>
                                      <p>{comment.user.nickname}:</p>
                                      <p>{comment.content}</p>
                                    </div>
                                    {comment.beReplied.length ? (
                                      <div>
                                        <p>
                                          @{comment.beReplied[0].user.nickname}
                                        </p>
                                        <p>{comment.beReplied[0].content}</p>
                                      </div>
                                    ) : (
                                      <span />
                                    )}
                                  </div>
                                }
                                description={toLocalTime(comment.time)}
                              />
                            </List.Item>
                          )}
                        />
                      </InfiniteScroll>
                    </div>
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
  setMyList: status => {
    dispatch(setMyList(status))
  },
  setAllPlay: status => {
    dispatch(setAllPlay(status))
  },
  addHistory: status => {
    dispatch(addHistory(status))
  }
})

export default connect(
  null,
  mapDispatchToProps
)(SonglistDetails)
