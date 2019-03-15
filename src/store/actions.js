import * as types from './actionTypes'
import { findIndex, playMode, shuffle } from '../utils/common'

export function setUserInfo(userInfo) {
  return {
    type: types.SET_USER_INFO,
    userInfo
  }
}

export function setSong(song) {
  return {
    type: types.SET_SONG,
    song
  }
}

export function setPlayingStatus(playing) {
  return {
    type: types.SET_PLAY_STATUS,
    playing
  }
}

export function setPlayList(playList) {
  return {
    type: types.SET_PLAY_LIST,
    playList
  }
}

export function setSequenceList(sequenceList) {
  return {
    type: types.SET_SEQUENCE_LIST,
    sequenceList
  }
}

export function setHistoryList(historyList) {
  return {
    type: types.SET_HISTORY_LIST,
    historyList
  }
}

export function setCurrentIndex(currentIndex) {
  return {
    type: types.SET_CURRENT_INDEX,
    currentIndex
  }
}

export function setMode(mode) {
  return {
    type: types.SET_MODE,
    mode
  }
}

export function setMyList(showMine) {
  return {
    type: types.SET_MY_LIST,
    showMine
  }
}

export function setMsg(showMsg) {
  return {
    type: types.SET_MSG,
    showMsg
  }
}

// 播放歌曲 歌单
export const setAllPlay = ({ playList, currentIndex }) => dispatch => {
  dispatch(setPlayingStatus(true))
  dispatch(setPlayList(playList))
  dispatch(setSequenceList(playList))
  dispatch(setHistoryList(playList[currentIndex]))
  dispatch(setCurrentIndex(currentIndex))
}

export const addPlay = music => (dispatch, getState) => {
  let sequenceList = [...getState().sequenceList]
  let index = findIndex(sequenceList, music)
  if (index > -1) {
    // 当前播放列表是否有待插入的音乐，直接改变当前播放的索引
    dispatch(setCurrentIndex(index))
  } else {
    index = sequenceList.push(music) - 1
    dispatch(setSequenceList(sequenceList))
    dispatch(setCurrentIndex(index))
  }
}

export const setChangeMode = mode => (dispatch, getState) => {
  let sequenceList = getState().sequenceList
  dispatch(setMode(mode))
  if (sequenceList.length && mode === playMode.random) {
    dispatch(setSequenceList(shuffle(sequenceList)))
  }
}
