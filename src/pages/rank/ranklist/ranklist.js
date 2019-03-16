import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { deepCopy, toNormalizeList } from '../../../utils/common'
import { setAllPlay, addHistory } from '../../../store/actions'

import './ranklist.scss'

class RankList extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  play = (song, index) => {
    const songLists = toNormalizeList(this.props.list.tracks)
    this.props.setAllPlay({
      playList: songLists,
      currentIndex: index
    })
    this.props.addHistory(song)
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
                onClick={this.play.bind(this, song, index)}
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
)(RankList)
