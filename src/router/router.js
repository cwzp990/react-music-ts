import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Recommend from '../pages/recommend/recommend'
import Songlist from '../pages/songlist/songlist'
import Rank from '../pages/rank/rank'
import Singer from '../pages/singer/singer'
import SongList from '../components/songlist-details/songlist-details'

const Routes = () => {
  return (
    <Switch>
      <Route path="/recommend" component={Recommend} />
      <Route path="/songlist" exact component={Songlist} />
      <Route path="/rank" component={Rank} />
      <Route path="/singer" component={Singer} />
      <Route path="/songlist/:id" component={SongList} />
      <Redirect to="/recommend" />
    </Switch>
  )
}

export default Routes
