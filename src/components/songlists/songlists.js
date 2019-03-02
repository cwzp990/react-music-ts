import React, { Component } from 'react'
import { Icon } from 'antd'

import './songlists.scss'

class SongLists extends Component {
  render() {
    const songList = this.props.songList || []
    return (
      <div className="m-SongLists">
        <ul className="list-wrapper">
          {songList.map(list => {
            return (
              <li className="list-item" key={list.id}>
                <p className="item-tips">{list.copywriter}</p>
                <span className="item-count">{list.playCount}</span>
                <span className="item-play">
                  <Icon type="play-circle" theme="outlined" />
                </span>
                <img src={list.picUrl || list.coverImgUrl} />
                <p className="nowrap item-title">{list.name}</p>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default SongLists
