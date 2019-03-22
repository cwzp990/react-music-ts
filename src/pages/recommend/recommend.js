import React, { Component } from 'react'
import { Icon, Carousel } from 'antd'
import SongLists from '../../components/songlists/songlists'
import { api } from '../../api/index'

import './recommend.scss'

class Recommend extends Component {
  state = {
    banners: [], // 轮播图
    songList: [] // 推荐歌单
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    api.getBanner().then(res => {
      if (res.status === 200) {
        this.setState({
          banners: res.data.banners
        })
      }
    })
    api.getPersonalized().then(res => {
      if (res.status === 200) {
        this.setState({
          songList: res.data.result
        })
      }
    })
  }

  // 上一页
  prev = () => {
    this.refs.banner.prev()
  }
  next = () => {
    this.refs.banner.next()
  }

  render() {
    return (
      <div className="m-Recommend">
        <div className="m-Recommend-banner">
          <Icon
            type="left"
            theme="outlined"
            className="btn-prev"
            onClick={this.prev}
          />
          <Carousel autoplay ref="banner">
            {this.state.banners.map(pic => {
              return (
                <div key={pic.targetId} className="img-wrapper">
                  <img src={pic.imageUrl} />
                </div>
              )
            })}
          </Carousel>
          <Icon
            type="right"
            theme="outlined"
            className="btn-next"
            onClick={this.next}
          />
        </div>
        <SongLists songList={this.state.songList} />
      </div>
    )
  }
}

export default Recommend
