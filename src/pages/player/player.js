/**
 * Player 组件
 * 只负责歌曲的播放，以及控制歌曲的播放模式
 * 不用关心歌曲列表，以及歌曲的播放顺序的逻辑处理
 */

import React, { Component } from 'react'
import { Icon, Slider } from 'antd'
import { connect } from 'react-redux'

import './player.scss'

class Player extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { song, playing } = this.props

    return (
      <div className="m-Player">
        <div className="m-Player-playBtn">
          <Icon type="step-backward" theme="outlined" />
          <Icon type="caret-right" theme="outlined" className="btn-center" />
          <Icon type="step-forward" theme="outlined" />
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
          <Icon type="bars" theme="outlined" />
        </div>
        <audio
          autoPlay
          src={
            playing
              ? `http://music.163.com/song/media/outer/url?id=${song.key}.mp3`
              : ''
          }
          ref="audio"
        />
      </div>
    )
  }
}

// 映射Redux全局的state到组件的props上 (接收)
const mapStateToProps = state => ({
  song: state.song,
  playing: state.playing,
  playList: state.playList,
  sequenceList: state.sequenceList,
  currentIndex: state.currentIndex,
  mode: state.mode
})

export default connect(
  mapStateToProps,
  null
)(Player)
