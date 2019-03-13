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
    if (!forbid) return false
    this.setState({
      currentIndex: index
    })
    this.props.handleEvent(item)
  }

  render() {
    const title = this.props.title
    const forbid = this.props.forbid
    const category = this.props.category
    
    return (
      <div className="m-Tag flex">
        <p className="m-Tag-title">{title}</p>
        <ul className="m-Tag-list">
          {category.map((tag, index) => (
            <li
              key={index}
              className={`item-tag ${
                this.state.currentIndex == index && forbid ? 'active' : ''
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
