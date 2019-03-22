import { createStore, compose, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducer'

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunkMiddleware)
    // window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

export default store
