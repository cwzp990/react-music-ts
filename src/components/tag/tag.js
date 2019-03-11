import React, { Component } from 'react'

import './tag.scss'

class Tag extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  
  selectedTag = (item) => {
    this.props.handleEvent(item)
  }

  render() {
    const title = this.props.title
    const category = this.props.category
    return (
      <div className="m-Tag flex">
        <span className="title">{title}</span>
        <ul className="m-Tag-list">
          {category.map((tag, index) => (
            <li key={index} className="item-tag" onClick={this.selectedTag.bind(this, tag)}>
              {tag.name || tag}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Tag
