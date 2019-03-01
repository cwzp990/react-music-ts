import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import Recommend from '../pages/recommend/recommend'
import Songlist from '../pages/songlist/songlist'
import Rank from '../pages/rank/rank'
import Singer from '../pages/singer/singer'

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/recommend" component={Recommend} />
        <Route path="/songlist" component={Songlist} />
        <Route path="/rank" component={Rank} />
        <Route path="/singer" component={Singer} />
        <Redirect to="/recommend" />
      </Switch>
    </Router>
  )
}

export default Routes
