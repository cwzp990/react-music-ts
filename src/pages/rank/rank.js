import React, { Component } from 'react'
import axios from 'axios'
import RankList from './ranklist/ranklist'
import Loading from '../../components/loading/loading'
import { api } from '../../api'

import './rank.scss'

class Rank extends Component {
  state = {
    isLoading: false,
    surge: {}, // 云音乐飙升榜
    news: {}, // 新歌排行榜
    original: {}, // 原创歌曲排行榜
    hot: {} // 热歌排行榜
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    axios
      .all([
        api.getTopListResource(3),
        api.getTopListResource(0),
        api.getTopListResource(2),
        api.getTopListResource(1)
      ])
      .then(
        axios.spread((res1, res2, res3, res4) => {
          const surge = res1.data.playlist
          const news = res2.data.playlist
          const original = res3.data.playlist
          const hot = res4.data.playlist
          this.setState({
            isLoading: true,
            surge,
            news,
            original,
            hot
          })
        })
      )
  }

  render() {
    const rank = this.state.isLoading
      ? [this.state.surge, this.state.news, this.state.original, this.state.hot]
      : []
      
    return (
      <div className="m-Rank">
        {rank.length ? (
          <ul className="m-Rank-wrapper">
            {rank.map(item => (
              <li key={item.id} className="m-Rank-list" title="双击进行播放" >
                <RankList list={item} />
              </li>
            ))}
          </ul>
        ) : (
          <Loading />
        )}
      </div>
    )
  }
}

export default Rank
