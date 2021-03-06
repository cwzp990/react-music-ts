import React, { Component } from 'react'
import { Button } from 'antd'
import { api } from '../../api/index'
import Classify from '../../components/classify/classify'
import Tag from '../../components/tag/tag'
import SongLists from '../../components/songlists/songlists'
import Loading from '../../components/loading/loading'

import './songlist.scss'

class SongList extends Component {
  state = {
    isLoading: false,
    showCategory: false,
    name: '全部',
    language: [], // 语种
    style: [], // 风格
    scene: [], // 场景
    emotion: [], // 情感
    theme: [], // 主题
    hot: [], // 热门
    songList: []
  }

  componentDidMount() {
    this.getCategory()
    this.getData()
    this.bindEvents()
  }

  componentWillUnmount() {
    this.unbindEvents()
  }

  // 添加绑定事件
  bindEvents = () => {
    document.addEventListener('click', this.closeCategoryBox, false)
  }

  // 移除绑定事件
  unbindEvents = () => {
    document.removeEventListener('click', this.closeCategoryBox, false)
  }

  getCategory = () => {
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
  }

  getData = (tag = '全部') => {
    this.setState({
      isLoading: false
    })
    api.getTopPlaylistResource(tag, 1).then(res => {
      if (res.status === 200) {
        this.setState({
          isLoading: true,
          songList: res.data.playlists,
          showCategory: false,
          name: tag
        })
      }
    })
  }

  showCategoryBox = e => {
    e.nativeEvent.stopImmediatePropagation()
    this.setState({
      showCategory: true
    })
  }

  closeCategoryBox = () => {
    this.setState({
      showCategory: false
    })
  }

  // 用户点击了tag标签
  selectedTag = tag => {
    this.getData(tag.name)
  }

  render() {
    const category = {
      name: this.state.name,
      language: this.state.language,
      style: this.state.style,
      scene: this.state.scene,
      emotion: this.state.emotion,
      theme: this.state.theme,
      hot: this.state.hot
    }

    return (
      <div className="m-SongList">
        <Button size="small" onClick={this.showCategoryBox}>
          {category.name}
          <i className="icon-down iconfont" />
        </Button>
        <Tag
          title="热门标签:"
          show={false}
          forbid={false}
          category={category.hot}
          handleEvent={this.selectedTag}
        />
        <div
          className={`m-SongList-pop ${
            this.state.showCategory ? 'show' : 'none'
          }`}
        >
          <Classify category={category} handleEvent={this.selectedTag} />
        </div>
        <div className="m-SongList-wrapper">
          {this.state.isLoading ? (
            <SongLists songList={this.state.songList} />
          ) : (
            <Loading />
          )}
        </div>
      </div>
    )
  }
}

export default SongList
