import React, { Component } from 'react'

import './tag.scss'

class Tag extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentIndex: 0
    }
  }

  selectedTag = (item, index, forbid) => {
    if (forbid) return false
    console.log('执行了')
    this.setState({
      currentIndex: index
    })
    this.props.handleEvent(item)
  }

  render() {
    const { title, show, forbid, category } = this.props

    return (
      <div className="m-Tag flex">
        <p className="m-Tag-title">{title}</p>
        <ul className="m-Tag-list">
          {category.map((tag, index) => (
            <li
              key={index}
              className={`item-tag ${
                this.state.currentIndex == index && show ? 'active' : ''
              }`}
              onClick={this.selectedTag.bind(this, tag, index, forbid)}
            >
              {tag.name || tag}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Tag
