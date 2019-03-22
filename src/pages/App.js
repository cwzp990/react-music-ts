import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Routers from '../router/router'
import Tips from '../components/tips/tips'
import Header from '../components/header/header'
import Nav from '../components/nav/nav'
import Lyrics from '../components/lyrics/lyrics'
import Player from '../pages/player/player'
import Mine from '../pages/mine/mine'
import store from '../store'

import './App.scss'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="m-App">
            <Tips />
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
            <Player />
            <Mine />
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
