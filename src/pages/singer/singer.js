import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Empty } from 'antd'
import Tag from '../../components/tag/tag'
import { api } from '../../api'

import './singer.scss'

let param1 = '1',
  param2 = '001',
  param3 = ''

class Singer extends Component {
  state = {
    singerList: []
  }

  static contextTypes = {
    router: PropTypes.object
  }

  componentDidMount() {
    this.getData()
  }

  getData = (id = '', capital = '') => {
    api.getSingerList(id, capital, 1).then(res => {
      if (res.status === 200) {
        this.setState({
          singerList: res.data.artists
        })
      }
    })
  }

  // 用户点击了tag标签
  selectedTag = tag => {
    if (tag.type === 'language') param1 = tag.id
    else if (tag.type === 'classify') param2 = tag.id
    else if (tag.type === 'hots') param3 = ''
    else param3 = tag.name
    this.getData(param1 + param2, param3)
  }

  getSingerDetails = (singer) => {
    this.context.router.history.push(`/singer/${singer.id}`)
  }

  getEN = () => {
    let arr = [{ name: '热门', type: 'hots' }]
    for (let i = 65; i < 91; i++) {
      arr.push({
        name: String.fromCharCode(i),
        type: 'hot'
      })
    }
    return arr
  }

  render() {
    const language = [
      { name: '华语', type: 'language', id: '1' },
      { name: '欧美', type: 'language', id: '2' },
      { name: '日本', type: 'language', id: '6' },
      { name: '韩国', type: 'language', id: '7' },
      { name: '其他', type: 'language', id: '4' }
    ]
    const classify = [
      { name: '男歌手', type: 'classify', id: '001' },
      { name: '女歌手', type: 'classify', id: '002' },
      { name: '乐队组合', type: 'classify', id: '003' }
    ]
    const hot = this.getEN()

    return (
      <div className="m-Singer">
        <div className="m-Singer-nav">
          <Tag
            title="语种:"
            show={true}
            forbid={false}
            category={language}
            handleEvent={this.selectedTag}
          />
          <Tag
            title="分类:"
            show={true}
            forbid={false}
            category={classify}
            handleEvent={this.selectedTag}
          />
          <Tag title="筛选:" show={true} forbid={false} category={hot} handleEvent={this.selectedTag} />
        </div>
        {this.state.singerList.length ? (
          <ul className="m-Singer-list">
            {this.state.singerList.map(singer => {
              return (
                <li key={singer.id} className="item-singer" onClick={this.getSingerDetails.bind(this, singer)}>
                  <p>
                    <img src={singer.picUrl} />
                  </p>
                  <p className="item-name">{singer.name}</p>
                </li>
              )
            })}
          </ul>
        ) : (
          <Empty />
        )}
      </div>
    )
  }
}

export default Singer
