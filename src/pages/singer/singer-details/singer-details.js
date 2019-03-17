import React, { Component } from 'react'
import { Avatar, Tabs, Empty, message } from 'antd'
import Loading from '../../../components/loading/loading'
import { api } from '../../../api/index'
import { toNormalizeAlbum, conversion, formatTime } from '../../../utils/common'

import './singer-details.scss'
import { resolve } from 'q'

const TabPane = Tabs.TabPane

class SingerDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      singer: {},
      isLoading: false,
      album: [],
      info: [],
      MV: [],
      similar: []
    }
  }

  componentDidMount() {
    this.getAlbumData()
  }

  changeTab = tab => {
    if (tab === '2') {
      this.getMVData()
    } else if (tab === '3') {
      this.getInfoData()
    } else if (tab === '4') {
      this.getSingerData()
    }
  }

  getAlbumData = () => {
    this.setState({
      isLoading: false
    })
    api.getArtistAlbumResource(this.props.match.params.id, 1).then(res => {
      if (res.status === 200) {
        this.setState({
          isLoading: true,
          singer: res.data.artist,
          album: toNormalizeAlbum(res.data.hotAlbums)
        })
      }
    })
  }

  getMVData = () => {
    this.setState({
      isLoading: false
    })
    api.getArtistMvResource(this.props.match.params.id).then(res => {
      if (res.status === 200) {
        this.setState({
          isLoading: true,
          MV: res.data.mvs
        })
      }
    })
  }

  getInfoData = () => {
    this.setState({
      isLoading: false
    })
    api.getArtistDescResource(this.props.match.params.id).then(res => {
      if (res.status === 200) {
        this.setState({
          isLoading: true,
          info: res.data
        })
      }
    })
  }

  getSingerData = () => {
    this.setState({
      isLoading: false
    })
    api
      .getSimiSinger(this.props.match.params.id)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            isLoading: true,
            similar: res.data
          })
        }
      })
      .catch(err => {
        this.setState({
          isLoading: true,
          similar: []
        })
        message.warning('此接口有问题，后续会更新')
      })
  }

  getMVUrl = async id => {
    let res = await api.getMVPlay(id)
    return new Promise((resolve, reject) => {
      if (res.status === 200) {
        resolve(res.data.data.url)
      } else {
        reject(res)
      }
    })
  }

  play = (video, event) => {
    let dom = event.target
    if (!dom) return false
    this.getMVUrl(video.id).then(res => {
      dom.src = res
      dom.play()
    })
  }

  render() {
    const { singer, isLoading, album, info, MV, similar } = this.state

    return (
      <div className="m-SingerDetails">
        <div className="m-Singer-Info">
          <Avatar shape="square" size={130} src={singer.picUrl} />
          <div className="m-Singer-count">
            <div className="m-Singer-follow">
              <p className="name">{singer.name}</p>
              <p className="followed">{singer.followed ? '已收藏' : '收藏'}</p>
            </div>
            <p>单曲数: {singer.musicSize}</p>
            <p>专辑数: {singer.albumSize}</p>
          </div>
        </div>
        <div className="m-Singer-main">
          <Tabs onTabClick={this.changeTab}>
            <TabPane tab="专辑" key="1">
              <ul className="m-Album-container">
                {album.map(albium => {
                  return (
                    <li
                      key={albium.key}
                      className="m-Album-list"
                      title={albium.title}
                    >
                      <p className="m-Album-avatar">
                        <img src={albium.picUrl} />
                      </p>
                      <p className="m-Album-name">
                        <span className="nowrap">{albium.title}</span>
                        <span className="count">{albium.size}首</span>
                      </p>
                      <p className="m-Album-date">{albium.date}</p>
                    </li>
                  )
                })}
              </ul>
            </TabPane>
            <TabPane tab="MV" key="2">
              <ul className="m-MV-container">
                {MV.map((item, index) => {
                  return (
                    <li key={index} className="m-MV-list" title={item.name}>
                      <video
                        src=""
                        poster={item.imgurl16v9}
                        controls
                        className="video-player"
                        onClick={this.play.bind(this, item)}
                      />
                      <p className="count">{conversion(item.playCount)}</p>
                      <p className="name">{item.name}</p>
                    </li>
                  )
                })}
              </ul>
            </TabPane>
            <TabPane tab="歌手详情" key="3">
              {isLoading ? (
                <div className="m-Info-container">
                  <p className="m-Info-brief">{info.briefDesc}</p>
                  {info.introduction ? (
                    <ul>
                      {info.introduction.map((item, index) => {
                        return (
                          <li key={index} className="m-Info-details">
                            <h3 className="title">{item.ti}</h3>
                            <p className="name">{item.txt}</p>
                          </li>
                        )
                      })}
                    </ul>
                  ) : (
                    <p />
                  )}
                </div>
              ) : (
                <Loading />
              )}
            </TabPane>
            <TabPane tab="相似歌手" key="4">
              {similar.length ? <div /> : <Empty />}
            </TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}

export default SingerDetails
