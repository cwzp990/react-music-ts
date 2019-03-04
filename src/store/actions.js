import * as types from './actionTypes'

export function setSinger(singer) {
  return {
    type: types.SET_SINGER,
    singer
  }
}

export function setPlayingStatus(playing) {
  return {
    type: types.SET_PLAY_STATUS,
    playing
  }
}

export function setPlayList(playlist) {
  return {
    type: types.SET_PLAY_LIST,
    playlist
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

export function setMyList(mine) {
  return {
    type: types.SET_MY_LIST,
    mine
  }
}

export function setMsg(msg) {
  return {
    type: types.SET_MSG,
    msg
  }
}