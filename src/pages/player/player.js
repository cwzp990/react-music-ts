/**
 * Player 组件
 * 只负责歌曲的播放，以及控制歌曲的播放模式
 * 不用关心歌曲列表，以及歌曲的播放顺序的逻辑处理
 */

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Icon, Slider, Tooltip } from 'antd'
import { connect } from 'react-redux'
import { formatTime, formatDuring, playMode } from '../../utils/common'
import History from '../../components/historyLists/historyLists'
import {
  setCurrentIndex,
  setPlayingStatus,
  setChangeMode,
  setAudio
} from '../../store/actions'

import './player.scss'

class Player extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showHistory: false,
      currentTime: '00:00',
      duration: 0
    }
  }

  static contextTypes = {
    router: PropTypes.object
  }

  componentDidMount() {
    this.modeList = [1, 2, 3]
    this.audioEle = ReactDOM.findDOMNode(this.refs.audio)
    // this.props.setAudio(this.audioEle)
    this.bindEvents()
  }

  componentWillUnmount() {
    this.unbindEvents()
  }

  // 添加绑定事件
  bindEvents = () => {
    document.addEventListener('click', this.closeHistory, false)
  }

  // 移除绑定事件
  unbindEvents = () => {
    document.removeEventListener('click', this.closeHistory, false)
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

  loop = () => {
    this.audioEle.currentTime = 0
    this.audioEle.play()
    this.props.setPlayingStatus(true)
  }

  end = () => {
    if (this.props.mode === playMode.loop) {
      this.loop()
    } else {
      this.next()
    }
  }

  changePlay = val => {
    this.audioEle.currentTime = val
    this.setState({
      currentTime: val
    })
  }

  timeUpdate = e => {
    const currentTime = e.target.currentTime
    const duration = e.target.duration
    this.setState({
      currentTime,
      duration
    })
  }

  changeMode = () => {
    let first = this.modeList.splice(0, 1)
    this.modeList.splice(this.modeList.length, 0, ...first)
    this.props.setChangeMode(this.modeList[0])
  }

  changeVoice = val => {
    this.audioEle.volume = val / 100
  }

  showComment = () => {
    const { currentIndex, playList } = this.props
    if (!playList.length) return false
    const currentSong = playList[currentIndex]
    this.context.router.history.push(`/comment/${currentSong.key}`)
  }

  showHistory = e => {
    e.nativeEvent.stopImmediatePropagation()
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
    const { currentTime, duration } = this.state
    const song = playList[currentIndex]
    const SEQUENCE = 1, LOOP = 2
    const IconFont = Icon.createFromIconfontCN({
      scriptUrl: '//at.alicdn.com/t/font_831982_ekj1a87f61a.js'
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
          <span>{formatTime(currentTime)}</span>
          <Slider
            min={0}
            max={duration}
            value={currentTime}
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
            <Slider onChange={this.changeVoice} defaultValue={58} />
          </div>
          <IconFont type="icon-comment" onClick={this.showComment} />
          <Tooltip placement="top" title={mode === SEQUENCE ? '顺序播放' : mode === LOOP ? '循环播放' : '随机播放'} trigger={"click"} >
            {mode === SEQUENCE ? (
              <IconFont
                type="icon-sequence"
                className="btn-center"
                onClick={this.changeMode}
              />
            ) : mode === LOOP ? (
              <IconFont
                type="icon-loop"
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
          </Tooltip>
          <IconFont type="icon-list" onClick={this.showHistory} />
        </div>
        <div
          className={`m-History-pop ${
            this.state.showHistory ? 'show' : 'none'
          }`}
        >
          <History playList={playList} historyList={historyList} />
        </div>
        <div className="player-bg">
          <img
            src={
              playList.length
                ? playList[currentIndex].picUrl
                : require('../../assets/img/bg.jpg')
            }
            width="100%"
            height="100%"
          />
        </div>
        {/* 灰色背景 */}
        <div className="player-mask" />
        <audio
          autoPlay
          ref="audio"
          onEnded={this.end}
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
  },
  setAudio: status => {
    dispatch(setAudio(status))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player)
