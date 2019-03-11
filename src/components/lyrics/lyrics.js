import React, { Component } from 'react'
import { connect } from 'react-redux'
import Lyric from 'lyric-parser'
import { Icon } from 'antd'
import { api } from '../../api'

import './lyric.scss'

class Lyrics extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lyric: '',
      song: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps)
    const { song, playing } = nextProps
    if (!playing) return false
    api.getLyricResource(song.key).then(res => {
      if (res.data.code === 200) {
        this.setState({
          lyric: res.data.lrc.lyric,
          song
        })
      }
    })
  }

  musicUrl = () => {
    return this.state.song.key
      ? this.state.song.picUrl
      : require('../../assets/img/player_cover.png')
  }

  render() {
    const { song, lyric } = this.state
    // let currentLyric = new Lyric(lyric)
    return (
      <div className="m-Lyric">
        <div className="m-Lyric-avatar">
          <p className="avatar-wrapper">
            <img src={this.musicUrl()} />
          </p>
          <p className="album-wrapper">
            <img src={require('../../assets/img/album_cover_player.png')} />
          </p>
        </div>
        <div className="m-Lyric-info">
          {song.key ? (
            <div>
              <p>歌曲名: {song.title}</p>
              <p className="singer-info">歌手名: {song.singer}</p>
              <p>专辑名: {song.album}</p>
            </div>
          ) : (
            <div>
              <p>在线音乐播放器</p>
              <p className="author-info">
                <Icon type="github" />
                <span>桔子</span>
              </p>
            </div>
          )}
        </div>
        <div className="m-Lyric-container">
          {!song.key ? (
            <p>当前没有播放音乐</p>
          ) : lyric ? (
            <p>{lyric}</p>
          ) : (
            <p>暂无歌词</p>
          )}
        </div>
      </div>
    )
  }
}

// 映射Redux全局的state到组件的props上 (接收)
const mapStateToProps = state => ({
  song: state.song,
  playing: state.playing
})

export default connect(
  mapStateToProps,
  null
)(Lyrics)
