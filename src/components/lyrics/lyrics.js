import React, { Component } from 'react'
import { connect } from 'react-redux'
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
    const { playing, playList, currentIndex, currentTime } = nextProps
    if (!playing) return false
    this.clacTop()
    this.highlightLyric(currentTime)
    const song = playList[currentIndex]
    if (!currentTime) {
      this.getLyricData(song)
    }
  }

  getLyricData = song => {
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

  lyricTop = () => {
    return {
      transform: `translate3d(0, ${-34 *
        (this.state.currentLineNum - this.top)}px, 0)`
    }
  }

  // 计算歌词居中的 top值
  clacTop = () => {
    let height = this.refs.musicLyric.offsetHeight
    this.top = Math.floor(height / 34 / 2)
  }

  // 高亮当前歌词
  highlightLyric = time => {
    if (!this.state.lyric.length) return false
    for (let i = 0; i < this.state.lyric.length; i++) {
      if (time > this.state.lyric[i].time) {
        this.setState({
          currentLineNum: i
        })
      }
    }
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
              <a
                href="https://github.com/cwzp990/react-music-ts"
                target="_Blank"
                className="author-info"
              >
                <i className="icon-github iconfont" />
                <span>桔子</span>
              </a>
            </div>
          )}
        </div>
        <div className="m-Lyric-container" ref="musicLyric">
          {!song.key ? (
            <p>当前没有播放音乐</p>
          ) : lyric.length ? (
            <div className="m-Lyric-wrapper" style={this.lyricTop()}>
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
  currentIndex: state.currentIndex,
  currentTime: state.currentTime
})

export default connect(
  mapStateToProps,
  null
)(Lyrics)
