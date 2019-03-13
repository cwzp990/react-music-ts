import * as types from './actionTypes'

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