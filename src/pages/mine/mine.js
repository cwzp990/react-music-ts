import React, { Component } from 'react'
import { connect } from 'react-redux'

import './mine.scss'

class Mine extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
  }

  render() {
    const { mine } = this.props
    return <div className={mine ? 'm-Mine' : 'm-Mine none'}>我是我的歌单</div>
  }
}

// 映射Redux全局的state到组件的props上 (接收)
const mapStateToProps = state => ({
	showMine: state.showMine
})

export default connect(mapStateToProps)(Mine)
