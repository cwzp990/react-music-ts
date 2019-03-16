import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Recommend from '../pages/recommend/recommend'
import Songlist from '../pages/songlist/songlist'
import Rank from '../pages/rank/rank'
import Singer from '../pages/singer/singer'
import SongList from '../components/songlist-details/songlist-details'
import Comment from '../components/comment/comment'

const Routes = () => {
  return (
    <Switch>
      <Route path="/recommend" exact component={Recommend} />
      <Route path="/songlist" exact component={Songlist} />
      <Route path="/rank" exact component={Rank} />
      <Route path="/singer" exact component={Singer} />
      <Route path="/songlist/:id" exact component={SongList} />
      <Route path="/comment/:id" exact component={Comment} />
      <Redirect to="/recommend" />
    </Switch>
  )
}

export default Routes
