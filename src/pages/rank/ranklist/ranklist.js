import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { deepCopy, toNormalizeList } from '../../../utils/common'
import {
  setPlayingStatus,
  setPlayList,
  setSequenceList,
  setHistoryList,
  setCurrentIndex
} from '../../../store/actions'

import './ranklist.scss'

class RankList extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  play = (song, index) => {
    this.props.setPlayingStatus(true)
    this.props.setPlayList(this.props.list)
    this.props.setSequenceList(this.props.list)
    this.props.setHistoryList(song)
    this.props.setCurrentIndex(index)
  }

  seeAll = item => {
    this.context.router.history.push(`/songlist/${item.id}`)
  }

  render() {
    // 歌单列表格式化
    const props = deepCopy(this.props.list)
    const songLists = toNormalizeList(props.tracks)
    delete props.tracks
    props.tracks = songLists
    const list = props.tracks.filter((item, index) => index < 10)

    return (
      <div className="m-RankList">
        <div className="m-RankList-title">
          <img src={props.coverImgUrl} className="list-cover" />
        </div>
        <ul>
          {list.map((song, index) => {
            return (
              <li
                key={song.key}
                className="rank-item"
                onDoubleClick={this.play.bind(this, song, index)}
              >
                <p className="nowrap">
                  {song.index}
                  &nbsp;
                  {song.title}
                </p>
                <p className="nowrap">{song.singer}</p>
              </li>
            )
          })}
        </ul>
        <div className="more" onClick={this.seeAll.bind(this, props)}>
          查看全部 >
        </div>
      </div>
    )
  }
}

// 映射dispatch到props (发送)
const mapDispatchToProps = dispatch => ({
  setPlayingStatus: status => {
    dispatch(setPlayingStatus(status))
  },
  setPlayList: status => {
    dispatch(setPlayList(status))
  },
  setSequenceList: status => {
    dispatch(setSequenceList(status))
  },
  setHistoryList: status => {
    dispatch(setHistoryList(status))
  },
  setCurrentIndex: status => {
    dispatch(setCurrentIndex(status))
  }
})

export default connect(
  null,
  mapDispatchToProps
)(RankList)
