import { createStore, compose } from 'redux'
import reducer from './reducer'

const store = createStore(
  reducer,
  // 触发 redux-devtools
  compose(window.devToolsExtension ? window.devToolsExtension() : f => f)
)

export default store
