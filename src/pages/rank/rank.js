import React, { Component } from 'react'
import axios from 'axios'
import RankList from '../../components/ranklist/ranklist'
import { api } from '../../api'

class Rank extends Component {
  state = {
    surge: {}, // 云音乐飙升榜
    news: {}, // 新歌排行榜
    original: {}, // 原创歌曲排行榜
    hot: {} // 热歌排行榜
  }

  componentDidMount() {
    axios
      .all([
        api.getTopListResource(3),
        api.getTopListResource(0),
        api.getTopListResource(2),
        api.getTopListResource(1)
      ])
      .then(
        axios.spread((res1, res2, res3, res4) => {
          const surge = res1.data
          const news = res2.data
          const original = res3.data
          const hot = res4.data
          this.setState({
            surge,
            news,
            original,
            hot
          })
        })
      )
  }

  render() {
    const rank = [
      this.state.surge,
      this.state.news,
      this.state.original,
      this.state.hot
    ]
    return (
      <div className="m-Rank">
        <ul>
          {rank.map(item => (
            <li key={item.id}>
              <RankList list={item} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Rank
