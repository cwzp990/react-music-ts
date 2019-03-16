/**
 * Player 组件
 * 只负责歌曲的播放，以及控制歌曲的播放模式
 * 不用关心歌曲列表，以及歌曲的播放顺序的逻辑处理
 */

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Icon, Slider } from 'antd'
import { connect } from 'react-redux'
import { formatTime, formatDuring } from '../../utils/common'
import History from '../../components/historyLists/historyLists'
import {
  setCurrentIndex,
  setPlayingStatus,
  setChangeMode
} from '../../store/actions'

import './player.scss'

class Player extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showHistory: false,
      currentTime: '00:00',
      percent: 0,
    }
  }

  static contextTypes = {
    router: PropTypes.object
  }

  componentDidMount() {
    this.modeList = [1, 2, 3]
    this.audioEle = ReactDOM.findDOMNode(this.refs.audio)
    this.bindEvents()
  }

  componentWillUnmount() {
    this.unbindEvents()
  }

  // 添加绑定事件
  bindEvents = () => {
    // document.body.addEventListener('click', this.closeHistory, false)
  }

  // 移除绑定事件
  unbindEvents = () => {
    // document.body.removeEventListener('click', this.closeHistory, false)
  }

  // 上一首
  prev = () => {
    const { playList } = this.props
    if (!playList.length) return false
    let index = this.props.currentIndex - 1
    if (index < 0) {
      index = this.props.playList.length - 1
    }
    this.props.setCurrentIndex(index)
  }

  // 播放控制
  play = e => {
    const { playing, playList } = this.props
    if (!playList.length) return false
    if (playing) {
      // 暂停
      this.audioEle.pause()
      this.props.setPlayingStatus(false)
    } else {
      // 播放
      this.audioEle.play()
      this.props.setPlayingStatus(true)
    }
    e.stopPropagation()
  }

  // 下一首
  next = () => {
    const { playList } = this.props
    if (!playList.length) return false
    let index = this.props.currentIndex + 1
    if (index === this.props.playList.length) {
      index = 0
    }
    this.props.setCurrentIndex(index)
  }

  changePlay = val => {
    const { currentIndex, playList } = this.props
    const currentTime = (playList[currentIndex].duration * val) / 100
    const m = parseInt((currentTime % (1000 * 60 * 60)) / (1000 * 60))
    const s = parseInt((currentTime % (1000 * 60)) / 1000)
    this.audioEle.currentTime = m*60+s
    this.setState({
      currentTime: formatDuring(currentTime)
    })
  }

  timeUpdate = e => {
    const currentTime = e.target.currentTime
    const duration = e.target.duration
    this.setState({
      currentTime: formatTime(currentTime),
      percent: parseInt(currentTime / duration * 100)
    })
  }

  changeMode = () => {
    let first = this.modeList.splice(0, 1)
    this.modeList.splice(this.modeList.length, 0, ...first)
    this.props.setChangeMode(this.modeList[0])
  }

  showComment = () => {
    const { currentIndex, playList } = this.props
    const currentSong = playList[currentIndex]
    this.context.router.history.push(`/comment/${currentSong.key}`)
  }

  showHistory = () => {
    this.setState({
      showHistory: true
    })
  }

  closeHistory = () => {
    this.setState({
      showHistory: false
    })
  }

  render() {
    const { mode, playing, currentIndex, playList, historyList } = this.props
    const { percent } = this.state
    const song = playList[currentIndex]
    const IconFont = Icon.createFromIconfontCN({
      scriptUrl: '//at.alicdn.com/t/font_831982_r328s0f73f.js'
    })

    return (
      <div className="m-Player">
        <div className="m-Player-playBtn">
          <Icon type="step-backward" theme="outlined" onClick={this.prev} />
          {playing ? (
            <Icon
              type="pause"
              theme="outlined"
              className="btn-center"
              onClick={this.play}
            />
          ) : (
            <Icon
              type="caret-right"
              theme="outlined"
              className="btn-center"
              onClick={this.play}
            />
          )}
          <Icon type="step-forward" theme="outlined" onClick={this.next} />
        </div>
        <div className="m-Progress-wrapper">
          <span>{this.state.currentTime}</span>
          <Slider
            value={percent}
            onChange={this.changePlay}
            disabled={!playing}
            className="progress"
          />
          {song ? (
            <span>{formatDuring(song.duration)}</span>
          ) : (
            <span>00:00</span>
          )}
        </div>
        <div className="m-Player-listBtn">
          <div className="m-Player-sound">
            <Icon type="sound" theme="filled" />
            <Slider />
          </div>
          <IconFont type="icon-comment" onClick={this.showComment} />
          {mode === 1 ? (
            <Icon
              type="bars"
              theme="outlined"
              className="btn-center"
              onClick={this.changeMode}
            />
          ) : mode === 2 ? (
            <Icon
              type="retweet"
              theme="outlined"
              className="btn-center"
              onClick={this.changeMode}
            />
          ) : (
            <IconFont
              type="icon-random"
              className="btn-center"
              onClick={this.changeMode}
            />
          )}
          <IconFont type="icon-list" onClick={this.showHistory} />
        </div>
        <div
          className={`m-History-pop ${
            this.state.showHistory ? 'show' : 'none'
          }`}
        >
          <History playList={playList} historyList={historyList} />
        </div>
        <audio
          autoPlay
          ref="audio"
          onTimeUpdate={this.timeUpdate}
          src={
            song
              ? `http://music.163.com/song/media/outer/url?id=${song.key}.mp3`
              : ''
          }
        />
      </div>
    )
  }
}

// 映射Redux全局的state到组件的props上 (接收)
const mapStateToProps = state => ({
  playing: state.playing,
  playList: state.playList,
  historyList: state.historyList,
  currentIndex: state.currentIndex,
  mode: state.mode
})

// 映射dispatch到props (发送)
const mapDispatchToProps = dispatch => ({
  setCurrentIndex: status => {
    dispatch(setCurrentIndex(status))
  },
  setPlayingStatus: status => {
    dispatch(setPlayingStatus(status))
  },
  setChangeMode: status => {
    dispatch(setChangeMode(status))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player)
