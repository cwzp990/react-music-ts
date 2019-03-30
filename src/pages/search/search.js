import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, List, Empty } from 'antd'
import { setAllPlay, addHistory } from '../../store/actions'
import { toNormalizeSearch } from '../../utils/common'

import { api } from '../../api'

import './search.scss'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      hots: [],
      list: [],
      offset: 1 // 分页
    }
  }

  componentDidMount() {
    this.getHotData()
  }

  getHotData = () => {
    api.getHotKeys().then(res => {
      if (res.status === 200) {
        this.setState({
          hots: res.data.result.hots
        })
      }
    })
  }

  handleChange = e => {
    this.setState({
      search: e.target.value
    })
    this.query()
  }

  query = () => {
    const { offset, search } = this.state
    if (!search) return false
    api.getSearchResource(search, offset).then(res => {
      if (res.status === 200) {
        let list = toNormalizeSearch(res.data.result.songs)
        this.setState({
          list
        })
      }
    })
  }

  setQuery = key => {
    this.setState({
      search: key
    })
    this.query()
  }

  // 播放歌曲
  play = (song, index) => {
    this.props.setAllPlay({
      playList: this.state.list,
      currentIndex: index
    })
    this.props.addHistory(song)
  }

  render() {
    const { hots, search } = this.state

    return (
      <div className="m-Search">
        <div className="m-Search-box">
          <Input
            placeholder="歌名/歌手"
            value={search}
            onChange={this.handleChange}
            style={{ width: 200 }}
          />
          <p className="m-Search-hotkeys">热门搜索</p>
          <ul className="m-Search-hot">
            {hots.map((key, index) => {
              return (
                <li
                  key={index}
                  className="key-item"
                  onClick={this.setQuery.bind(this, key.first)}
                >
                  {key.first}
                </li>
              )
            })}
          </ul>
        </div>
        <div className="m-Search-list">
          {this.state.list.length ? (
            <List
              header={
                <div className="m-Search-title">
                  <p className="item-song">序号</p>
                  <p className="item-song">歌曲</p>
                  <p className="item-song">歌手</p>
                  <p className="item-song">专辑</p>
                </div>
              }
              dataSource={this.state.list}
              renderItem={song => (
                <List.Item
                  key={song.key}
                  className="m-Search-result"
                  onClick={this.play.bind(this, song, song.index - 1)}
                >
                  <p className="item-song">{song.index}</p>
                  <p className="item-song">{song.title}</p>
                  <p className="item-song">{song.singer}</p>
                  <p className="item-song">{song.album}</p>
                </List.Item>
              )}
            />
          ) : (
            <Empty />
          )}
        </div>
      </div>
    )
  }
}

// 映射dispatch到props (发送)
const mapDispatchToProps = dispatch => ({
  setAllPlay: status => {
    dispatch(setAllPlay(status))
  },
  addHistory: status => {
    dispatch(addHistory(status))
  }
})

export default connect(
  null,
  mapDispatchToProps
)(Search)
