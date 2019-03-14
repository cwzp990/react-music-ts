/**
 * Player 组件
 * 只负责歌曲的播放，以及控制歌曲的播放模式
 * 不用关心歌曲列表，以及歌曲的播放顺序的逻辑处理
 */

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Icon, Slider } from 'antd'
import { connect } from 'react-redux'
import History from '../../components/historyLists/historyLists'
import { setCurrentIndex, setPlayingStatus } from '../../store/actions'

import './player.scss'

class Player extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showHistory: false
    }
  }

  componentDidMount() {
    this.audioEle = ReactDOM.findDOMNode(this.refs.audio)
  }

  // 上一首
  prev = () => {
    let index = this.props.currentIndex - 1
    if (index < 0) {
      index = this.props.playList.length - 1
    }
    this.props.setCurrentIndex(index)
  }

  // 播放控制
  play = e => {
    const { playing } = this.props
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
    let index = this.props.currentIndex + 1
    if (index === this.props.playList.length) {
      index = 0
    }
    this.props.setCurrentIndex(index)
  }

  showHistory = () => {
    this.setState({
      showHistory: true
    })
  }

  render() {
    const { playing, playList, currentIndex, sequenceList } = this.props
    const song = playList[currentIndex]
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
          <Slider />
        </div>
        <div className="m-Player-listBtn">
          <div className="m-Player-sound">
            <Icon type="sound" theme="filled" />
            <Slider />
          </div>
          <Icon type="retweet" theme="outlined" className="btn-center" />
          <Icon type="bars" theme="outlined" onClick={this.showHistory} />
        </div>
        <div
          className={`m-History-pop ${
            this.state.showHistory ? 'show' : 'none'
          }`}
        >
          <History playList={sequenceList} />
        </div>
        <audio
          autoPlay
          ref="audio"
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
  sequenceList: state.sequenceList,
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
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player)
