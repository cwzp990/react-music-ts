import React, { Component } from 'react'
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Button } from 'antd';

import './nav.scss'

class Nav extends Component {
  render () {
    return (
      <Router>
        <div className="m-Nav">
          <Link to='/recommend'><Button size={'large'}>推荐</Button></Link>
          <Link to='/songlist'><Button size={'large'}>歌单</Button></Link>
          <Link to='/rank'><Button size={'large'}>排行</Button></Link>
          <Link to='/singer'><Button size={'large'}>歌手</Button></Link>
        </div>
      </Router>
    )
  }
}

export default Nav