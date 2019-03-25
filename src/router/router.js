import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Bundle from './asyncComponent'
import Loading from '../components/loading/loading'

const AsyncComponent = loadComponent => props => (
  <Bundle load={loadComponent}>
    {Comp => (Comp ? <Comp {...props} /> : <Loading />)}
  </Bundle>
)

const Recommend = AsyncComponent(() => import('../pages/recommend/recommend'))
const Songlist = AsyncComponent(() => import('../pages/songlist/songlist'))
const SongDetails = AsyncComponent(() =>
  import('../pages/songlist/songlist-details/songlist-details')
)
const Rank = AsyncComponent(() => import('../pages/rank/rank'))
const Singer = AsyncComponent(() => import('../pages/singer/singer'))
const SingerDetails = AsyncComponent(() =>
  import('../pages/singer/singer-details/singer-details')
)
const Comment = AsyncComponent(() => import('../components/comment/comment'))
const Search = AsyncComponent(() => import('../pages/search/search'))

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
