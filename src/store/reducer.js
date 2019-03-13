import { combineReducers } from 'redux'
import * as types from './actionTypes'
import { playMode } from '../utils/common'

// 定义初始 state
const defaultState = {
  // 用户信息
  userInfo: {},
  // 当前歌曲信息
  song: {},
  // 播放状态
  playing: false,
  // 当前播放列表
  playList: [],
  // 顺序列表
  sequenceList: [],
  // 播放单曲的序号
  currentIndex: -1,
  // 播放方式
  mode: playMode.sequence,
  // 我的歌单显隐
  showMine: false,
  // 用户聊天消息
  showMsg: false
}

// state 里存放了所有的数据
// reducer 可以接收数据，但不可以改变数据
// 设置用户信息
function userInfo(userInfo = defaultState.userInfo, action) {
  switch (action.type) {
    case types.SET_USER_INFO:
      return action.userinfo
    default:
      return userInfo
  }
}

// 设置歌手
function song(song = defaultState.song, action) {
  switch (action.type) {
    case types.SET_SONG:
      return action.song
    default:
      return song
  }
}

// 设置播放状态
function playing(playing = defaultState.playing, action) {
  switch (action.type) {
    case types.SET_PLAY_STATUS:
      return action.playing
    default:
      return playing
  }
}

// 设置播放列表
function playList(playList = defaultState.playList, action) {
  switch (action.type) {
    case types.SET_PLAY_LIST:
      return action.playList
    default:
      return playList
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
function showMine(showMine = defaultState.showMine, action) {
  switch (action.type) {
    case types.SET_MY_LIST:
      return action.showMine
    default:
      return showMine
  }
}

// 用户聊天消息显隐
function showMsg(showMsg = defaultState.showMsg, action) {
  switch (action.type) {
    case types.SET_MSG:
      return action.showMsg
    default:
      return showMsg
  }
}

const reducer = combineReducers({
  userInfo,
  song,
  playing,
  playList,
  sequenceList,
  currentIndex,
  mode,
  showMine,
  showMsg
})

export default reducer
