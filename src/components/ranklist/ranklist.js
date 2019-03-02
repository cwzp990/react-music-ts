import React, { Component } from 'react'

class RankList extends Component {
  render () {
    const list = this.props.list
    return (
      <div className="m-RankList">
        <div className="m-RankList-title">{list.name}</div>
        <ul>
          {
            list.tracks.map((song, index) => {
              return (
                <li key={song.id} className="rank-item">
                  <p>{index + 1}{song.name}</p>
                  <p>
                    {
                      song.ar.map(singer => <span>{singer.name + '/'.slice(0, -1)}</span>)
                    }
                  </p>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default RankList