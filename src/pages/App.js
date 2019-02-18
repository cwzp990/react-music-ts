import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from '../store'
import Header from '../components/header/header'
import Sider from '../components/sider/sider'
import Recommend from './recommend/recommend'
import SongList from './songlist/songlist'
import Rank from './rank/rank'
import Singer from './singer/singer'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: true
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Sider />
            <div className="app-background" />
            {/* exact 路径完全相等的时候才显示路由内的内容 */}
            <Route exact path="/" component={Recommend} />
            <Route path="/songlist" component={SongList} />
            <Route path="/rank" component={Rank} />
            <Route path="/singer" component={Singer} />
            {this.state.redirect ? <Redirect to="/" /> : null}
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
