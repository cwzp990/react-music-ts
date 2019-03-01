import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Routers from '../router/router'
import Header from '../components/header/header'
import Nav from '../components/nav/nav'
import Lyrics from '../components/lyrics/lyrics'
import Bar from '../components/bar/bar'
import './App.scss'
import store from '../store'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="m-App">
          <Header />
          <div className="m-App-Content">
            <div className="m-App-Content-l">
              <Nav />
              <Routers />
            </div>
            <div className="m-App-Content-r">
              <Lyrics />
            </div>
          </div>
          <Bar />
        </div>
      </Provider>
    )
  }
}

export default App
