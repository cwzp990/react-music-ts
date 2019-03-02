import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Recommend from '../pages/recommend/recommend'
import Songlist from '../pages/songlist/songlist'
import Rank from '../pages/rank/rank'
import Singer from '../pages/singer/singer'

const Routes = () => {
  return (
    <Switch>
      <Route path="/recommend" component={Recommend} />
      <Route path="/songlist" component={Songlist} />
      <Route path="/rank" component={Rank} />
      <Route path="/singer" component={Singer} />
      <Redirect to="/recommend" />
    </Switch>
  )
}

export default Routes
