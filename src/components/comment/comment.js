import React, { Component } from 'react'
import { toLocalTime } from '../../utils/common'

import './comment.scss'

class Comment extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render () {
    const commentList = this.props.commentList

    return (
      <div className="m-Comment">
        <ul className="m-Comment-wrapper">
          {
            commentList.map(comment => {
              return (
                <li key={comment.commentId} className="m-Comment-list">
                  <div className="m-Comment-avatar-wrapper">
                    <img src={comment.user.avatarUrl} />
                  </div>
                  <div className="m-Comment-content">
                    <p><span>{comment.user.nickname}:</span>{comment.content}</p>
                    {
                      comment.beReplied.length ? (<p><span>@{comment.beReplied[0].user.nickname}</span>{comment.beReplied[0].content}</p>) : ''
                    }
                    <p className="m-Comment-date"><span>{toLocalTime(comment.time)}</span></p>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default Comment