import * as types from './actionTypes'

// 定义初始 state
const defaultState = {
  // 全屏
  fullScreen: false,
  // 播放
  playing: false,
  // 当前播放列表
  playlist: []
}

// state 里存放了所有的数据
// reducer 可以接收数据，但不可以改变数据
export default (state = defaultState, action) => {
  if (action.type === types.CHANGE_SCREEN_SIZE) {
    const newState = deepCopy(state)
    newState.fullScreen = action.screen
    return newState
  }
  if (action.type === types.CHANGE_PLAY_STATUS) {
    const newState = deepCopy(state)
    newState.playing = action.status
    return newState
  }
  if (action.type === types.CHANGE_PLAY_LIST) {
    const newState = deepCopy(state)
    newState.playlist = action.playlist
    return newState
  }
}

function deepCopy(val) {
  return JSON.parse(JSON.stringify(val))
}
