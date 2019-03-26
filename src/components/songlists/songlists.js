import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { conversion } from '../../utils/common'

import './songlists.scss'

class SongLists extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  getListDetails = item => {
    this.context.router.history.push(`/songlist/${item.id}`)
  }

  render() {
    const songList = this.props.songList || []

    return (
      <div className="m-SongLists">
        <ul className="list-wrapper">
          {songList.map(list => {
            return (
              <li
                key={list.id}
                className="list-item"
                title={list.name}
                onClick={this.getListDetails.bind(this, list)}
              >
                <p className="item-tips">{list.copywriter}</p>
                <div className="item-count">
                  <i className="icon-headset iconfont" />
                  <span>{conversion(list.playCount)}</span>
                </div>
                <span className="item-play">
                  <i className="icon-play2 iconfont" />
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
