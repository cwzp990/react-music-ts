import React, { Component } from 'react'

import './classify.scss'

class Classify extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  selectedTag = (item) => {
    this.props.handleEvent(item)
  }

  render() {
    const arr = [
      { name: '语种', type: 'language', list: this.props.category.language },
      { name: '风格', type: 'style', list: this.props.category.style },
      { name: '场景', type: 'scene', list: this.props.category.scene },
      { name: '情感', type: 'emotion', list: this.props.category.emotion },
      { name: '主题', type: 'theme', list: this.props.category.theme }
    ]
    return (
      <div className="m-Classify">
        <p className="m-Classify-all box">全部歌单</p>
        <ul className="m-Classify-other">
          {arr.map(item => {
            return (
              <li key={item.type} className="other-item">
                <p className="item-name">{item.name}</p>
                <ul className="item-tag">
                  {item.list.map((tag, index) => (
                    <li
                      key={index}
                      className="tag-box box"
                      onClick={this.selectedTag.bind(this, tag)}
                    >
                      {tag.name}
                    </li>
                  ))}
                </ul>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default Classify
