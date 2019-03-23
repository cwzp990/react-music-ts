import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, List } from 'antd'
import InfiniteScroll from 'react-infinite-scroller'
import { setAllPlay, addHistory } from '../../store/actions'
import { toNormalizeSearch } from '../../utils/common'

import { api } from '../../api'

import './search.scss'

const SearchBox = Input.Search

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      hasMore: true,
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

  query = val => {
    const { offset } = this.state
    let more = false
    api.getSearchResource(val, offset).then(res => {
      if (res.status === 200) {
        if (res.data.result.songCount > offset * 20) more = true
        let list = toNormalizeSearch(res.data.result.songs)
        this.setState({
          list,
          hasMore: more
        })
      }
    })
  }

  onLoad = () => {
    console.log(this.state.hasMore)
    let offset = this.state.offset + 1
    this.setState({
      loading: false,
      offset
    })
    if (!this.state.hasMore) {
      this.setState({
        loading: true,
        hasMore: false
      })
      return false
    }
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
    const { hots } = this.state

    return (
      <div className="m-Search">
        <div className="m-Search-box">
          <SearchBox
            placeholder="歌名/歌手"
            onSearch={value => this.query(value)}
            style={{ width: 200 }}
          />
          <p className="m-Search-hotkeys">热门搜索</p>
          <ul className="m-Search-hot">
            {hots.map((key, index) => {
              return (
                <li
                  key={index}
                  className="key-item"
                  onClick={this.query.bind(this, key.first)}
                >
                  {key.first}
                </li>
              )
            })}
          </ul>
        </div>
        <div className="m-Search-list">
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={this.onLoad}
            hasMore={!this.state.loading && this.state.hasMore}
            useWindow={false}
          >
            <div className="m-Search-scroll">
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
            </div>
          </InfiniteScroll>
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
