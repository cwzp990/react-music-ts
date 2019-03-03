import React, { Component } from 'react'

import './ranklist.scss'

class RankList extends Component {
  render() {
    const props = this.props.list
    const list = props.tracks.filter((item, index) => index < 10)
    return (
      <div className="m-RankList">
        <div className="m-RankList-title">
          <img src={props.coverImgUrl} className="list-cover" />
        </div>
        <ul>
          {list.map((song, index) => {
            return (
              <li key={song.id} className="rank-item">
                <p className="nowrap">
                  {index + 1}
                  &nbsp;
                  {song.name}
                </p>
                <p className="nowrap">
                  {song.ar.map(singer => (
                    <span key={singer.id}>{singer.name + '/'}</span>
                  ))}
                </p>
              </li>
            )
          })}
        </ul>
        <div className="more">查看全部 ></div>
      </div>
    )
  }
}

export default RankList
