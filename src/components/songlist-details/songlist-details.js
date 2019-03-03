import React, { Component } from 'react'
import Tag from '../../components/tag/tag'
import Loading from '../loading/loading'
import { api } from '../../api/index'

import './songlist-details.scss'

class SonglistDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      details: {}, // 歌单详情数据
      key: 'tab1'
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    // console.log(this.props) 获取url参数
    api.getPlaylistDetailResource(this.props.match.params.id).then(res => {
      if (res.status === 200) {
        this.setState({
          isLoading: true,
          details: res.data.playlist
        })
      }
    })
  }

  render() {
    const details = this.state.details
    return (
      <div className="m-SonglistDetails">
        {this.state.isLoading ? (
          <div className="m-Details-wrapper">
            <div className="m-Details-header">
              <div className="m-Details-cover">
                <img src={details.coverImgUrl} />
              </div>
              <div className="m-details-info">
                <h3 className="m-details-info-title">
                  <p className="m-details-info-name">{details.name}</p>
                  <div className="m-details-info-count">
                    <p className="info-count">
                      <span>歌曲数</span>
                      <span>{details.tracks.length}</span>
                    </p>
                    <p className="info-count">
                      <span>播放数</span>
                      <span>{details.playCount}</span>
                    </p>
                  </div>
                </h3>
                <div className="m-details-info-author">
                  <div className="author-avatar">
                    <div className="author-avatar-wrapper">
                      <img src={details.creator.avatarUrl} />
                    </div>
                    <p className="author-name">{details.creator.nickname}</p>
                  </div>
                  <p className="author-createTime">{details.createTime}</p>
                </div>
                <div className="m-details-info-tag">
                  <Tag title="标签" category={details.tags} />
                </div>
                <div>
                  <span className="title">简介: </span>
                  <span className="m-details-brief">{details.description}</span>
                </div>
              </div>
            </div>
            <div className="m-Details-list">
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    )
  }
}

export default SonglistDetails
