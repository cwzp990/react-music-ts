import { combineReducers } from 'redux'
import * as types from './actionTypes'
import { playMode } from '../utils/common'
// 定义初始 state
const defaultState = {
  // 歌手
  singer: null,
  // 播放状态
  playing: false,
  // 当前播放列表
  playlist: [],
  // 顺序列表
  sequenceList: [],
  // 播放单曲的序号
  currentIndex: -1,
  // 播放方式
  mode: playMode.sequence,
  // 我的歌单显隐
  mine: false,
  // 用户聊天消息
  msg: false
}

// state 里存放了所有的数据
// reducer 可以接收数据，但不可以改变数据
// 设置歌手
function singer(singer = defaultState.singer, action) {
  switch (action.type) {
    case types.SET_SINGER:
      return action.singer
    default:
      return singer
  }
}

// 设置播放状态
function playingStatus(playing = defaultState.playing, action) {
  switch (action.type) {
    case types.SET_PLAY_STATUS:
      return action.playing
    default:
      return playing
  }
}

// 设置播放列表
function playList(playlist = defaultState.playlist, action) {
  switch (action.type) {
    case types.SET_PLAY_LIST:
      return action.playlist
    default:
      return playlist
  }
}

// 设置顺序播放列表
function sequenceList(sequenceList = defaultState.sequenceList, action) {
  switch (action.type) {
    case types.SET_SEQUENCE_LIST:
      return action.sequenceList
    default:
      return sequenceList
  }
}

// 设置当前音乐
function currentIndex(currentIndex = defaultState.currentIndex, action) {
  switch (action.type) {
    case types.SET_CURRENT_INDEX:
      return action.currentIndex
    default:
      return currentIndex
  }
}

// 设置播放模式
function mode(mode = defaultState.mode, action) {
  switch (action.type) {
    case types.SET_MODE:
      return action.mode
    default:
      return mode
  }
}

// 我的歌单抽屉显隐
function myList(mine = defaultState.mine, action) {
  switch (action.type) {
    case types.SET_MY_LIST:
      return action.mine
    default:
      return mine
  }
}

// 用户聊天消息显隐
function msg(msg = defaultState.msg, action) {
  switch (action.type) {
    case types.SET_MSG:
      return action.msg
    default:
      return msg
  }
}

const reducer = combineReducers({
  singer,
  playingStatus,
  playList,
  sequenceList,
  currentIndex,
  mode,
  myList,
  msg
})

export default reducer
