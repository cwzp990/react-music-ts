import React, { Component } from 'react'
import { Icon, Avatar } from 'antd'
import { toLocalTime } from '../../utils/common'

import './comment.scss'

class Comment extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const commentList = this.props.commentList
    return (
      <div className="m-Comment">
        <ul className="m-Comment-wrapper">
          {commentList.map(comment => {
            return (
              <li key={comment.commentId} className="m-Comment-list">
                <div className="m-Comment-avatar-wrapper">
                  {comment.user.avatarUrl ? (
                    <Avatar
                      size={50}
                      shape="square"
                      src={comment.user.avatarUrl}
                    />
                  ) : (
                    <Avatar size={50} shape="square" icon="user" />
                  )}
                </div>
                <div className="m-Comment-content">
                  <div className="comment-mine">
                    <p className="name">{comment.user.nickname}:</p>
                    <p className="content">{comment.content}</p>
                  </div>
                  {comment.beReplied.length ? (
                    <div className="comment-other">
                      <p>@{comment.beReplied[0].user.nickname}</p>
                      <p>{comment.beReplied[0].content}</p>
                    </div>
                  ) : (
                    <span />
                  )}
                  <div className="m-Comment-data">
                    <p className="comment-date">{toLocalTime(comment.time)}</p>
                    <p className="comment-like">
                      <Icon type="like" />
                      {comment.likedCount}
                    </p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default Comment
