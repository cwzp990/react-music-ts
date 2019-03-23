import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Recommend from '../pages/recommend/recommend'
import Songlist from '../pages/songlist/songlist'
import SongDetails from '../pages/songlist/songlist-details/songlist-details'
import Rank from '../pages/rank/rank'
import Singer from '../pages/singer/singer'
import SingerDetails from '../pages/singer/singer-details/singer-details'
import Comment from '../components/comment/comment'
import Search from '../pages/search/search'

const Routes = () => {
  return (
    <Switch>
      <Route path="/recommend" exact component={Recommend} />
      <Route path="/songlist" exact component={Songlist} />
      <Route path="/songlist/:id" exact component={SongDetails} />
      <Route path="/rank" exact component={Rank} />
      <Route path="/singer" exact component={Singer} />
      <Route path="/singer/:id" exact component={SingerDetails} />
      <Route path="/comment/:id" exact component={Comment} />
      <Route path="/search" exact component={Search} />
      <Redirect to="/recommend" />
    </Switch>
  )
}

export default Routes
