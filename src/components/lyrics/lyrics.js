import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Icon } from 'antd'
import { parseLyric } from '../../utils/common'
import { api } from '../../api'

import './lyric.scss'

class Lyrics extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lyric: [],
      song: {},
      currentLineNum: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps)
    const { playing, playList, currentIndex } = nextProps
    if (!playing) return false
    const song = playList[currentIndex]
    api.getLyricResource(song.key).then(res => {
      if (res.data.code === 200) {
        // 暂无歌词
        if (res.data.nolyric) {
          this.setState({
            lyric: [],
            song
          })
          return false
        }
        let currentLyric = parseLyric(res.data.lrc.lyric)
        this.setState({
          lyric: currentLyric,
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
    const { lyric, song, currentLineNum } = this.state

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
        <div className="m-Lyric-container" ref="musicLyric">
          {!song.key ? (
            <p>当前没有播放音乐</p>
          ) : lyric.length ? (
            <div>
              {lyric.map((line, index) => {
                return (
                  <p
                    key={index}
                    className={`m-Lyric-line ${
                      currentLineNum == index ? 'selected' : ''
                    }`}
                  >
                    {line.txt}
                  </p>
                )
              })}
            </div>
          ) : (
            <div>暂无歌词</div>
          )}
        </div>
      </div>
    )
  }
}

// 映射Redux全局的state到组件的props上 (接收)
const mapStateToProps = state => ({
  playing: state.playing,
  playList: state.playList,
  currentIndex: state.currentIndex
})

export default connect(
  mapStateToProps,
  null
)(Lyrics)
