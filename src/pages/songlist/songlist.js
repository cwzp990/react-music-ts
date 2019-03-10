import React, { Component } from 'react'
import { Button, Icon } from 'antd'
import { api } from '../../api/index'
import Classify from '../../components/classify/classify'
import Tag from '../../components/tag/tag'
import SongLists from '../../components/songlists/songlists'

import './songlist.scss'

class SongList extends Component {
  state = {
    language: [], // 语种
    style: [], // 风格
    scene: [], // 场景
    emotion: [], // 情感
    theme: [], // 主题
    hot: [], // 热门
    songList: []
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    api.getCategoryPlayList().then(res => {
      if (res.status === 200) {
        this.setState({
          language: res.data.sub.filter(i => i.category === 0),
          style: res.data.sub.filter(i => i.category === 1),
          scene: res.data.sub.filter(i => i.category === 2),
          emotion: res.data.sub.filter(i => i.category === 3),
          theme: res.data.sub.filter(i => i.category === 4),
          hot: res.data.sub.filter(i => i.hot)
        })
      }
    })

    api.getTopPlaylistResource().then(res => {
      if (res.status === 200) {
        this.setState({
          songList: res.data.playlists
        })
      }
    })
  }

  render() {
    const category = {
      language: this.state.language,
      style: this.state.style,
      scene: this.state.scene,
      emotion: this.state.emotion,
      theme: this.state.theme,
      hot: this.state.hot
    }
    return (
      <div className="m-SongList">
        <Button size="small">
          流行
          <Icon type="down" />
        </Button>
        <Tag title="热门标签:" category={category.hot} />
        <div className="m-SongList-pop scrollbar">
          <Classify category={category} />
        </div>
        <div className="m-SongList-wrapper scrollbar">
          <SongLists songList={this.state.songList} />
        </div>
      </div>
    )
  }
}

export default SongList
