import React, { Component } from 'react'
import { Avatar, List, Icon } from 'antd'
import InfiniteScroll from 'react-infinite-scroller'
import { api } from '../../api/index'
import { toLocalTime } from '../../utils/common'

import './comment.scss'

class Comment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false, // 评论
      hasMore: true, // 评论
      offset: 1, // 分页
      comments: []
    }
  }

  componentDidMount() {
    this.getCommentList()
  }

  getCommentList = () => {
    api
      .getCommentResource(this.props.match.params.id, this.state.offset)
      .then(res => {
        let comments =
          this.state.offset === 1
            ? res.data.hotComments.concat(res.data.comments)
            : this.state.comments.concat(res.data.comments)
        if (res.status === 200) {
          this.setState({
            comments,
            count: res.data.total,
            hasMore: res.data.more,
            loading: true
          })
        }
      })
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
    return (
      <div className="m-Comment">
        <p className="m-Comment-count">网友评论({this.state.count})</p>
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
                    <p className={`m-Comment-like ${comment.likedCount > 999 ? 'hot' : ''}`}>
                      <Icon type="like" />
                      {comment.likedCount}
                    </p>
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar size={50} src={comment.user.avatarUrl} />}
                    title={
                      <div>
                        <div>
                          <p className="m-Comment-name">
                            {comment.user.nickname}:
                          </p>
                          <p className="m-Comment-content">{comment.content}</p>
                        </div>
                        {comment.beReplied.length ? (
                          <div className="m-Comment-replied">
                            <span className="m-Comment-name">
                              @{comment.beReplied[0].user.nickname}
                            </span>
                            <span className="m-Comment-content">
                              {comment.beReplied[0].content}
                            </span>
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
    )
  }
}

export default Comment
