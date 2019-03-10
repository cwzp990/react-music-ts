import React, { Component } from 'react'
import { Empty } from 'antd'
import Tag from '../../components/tag/tag'
import { api } from '../../api'

import './singer.scss'

class Singer extends Component {
  state = {
    id: undefined,
    initial: '',
    singerList: []
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    api.getSingerList(this.state.id, this.state.initial).then(res => {
      if (res.status === 200) {
        this.setState({
          singerList: res.data.artists
        })
      }
    })
  }

  getEN = () => {
    let arr = [{ name: '热门', id: '666' }]
    for (let i = 65; i < 91; i++) {
      arr.push({
        name: String.fromCharCode(i)
      })
    }
    return arr
  }

  render() {
    const language = [
      { name: '华语', id: '1' },
      { name: '欧美', id: '2' },
      { name: '日本', id: '6' },
      { name: '韩国', id: '7' },
      { name: '其他', id: '4' }
    ]
    const classify = [
      { name: '男歌手', id: '001' },
      { name: '女歌手', id: '002' },
      { name: '乐队组合', id: '003' }
    ]
    const hot = this.getEN()

    return (
      <div className="m-Singer scrollbar">
        <div className="m-Singer-nav">
          <Tag title="语种:" category={language} />
          <Tag title="分类:" category={classify} />
          <Tag title="筛选:" category={hot} />
        </div>
        {this.state.singerList.length ? (
          <ul className="m-Singer-list">
            {this.state.singerList.map(singer => {
              return (
                <li key={singer.id}>
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
