import React, { Component } from 'react'
import { Modal, Button, Icon, Typography } from 'antd'

const { Paragraph } = Typography

class Tips extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: true
    }
  }

  onSure = () => {
    this.setState({
      visible: false
    })
  }

  render() {
    return (
      <div className="m-Tips">
        <Modal
          title="更新信息V1.2"
          visible={this.state.visible}
          closable={false}
          onOk={this.onSure}
          footer={[
            <Button type="primary" onClick={this.onSure} key="sure">
              嗯哼~
            </Button>
          ]}
        >
          <Typography>
            <Paragraph>
              <ul>
                <li>
                  本页面使用
                  <a href="https://react.docschina.org/" target="_Blank">
                    React
                  </a>
                  编写，故推荐使用Chrome浏览器进行浏览
                </li>
                <li>
                  添加搜索歌曲功能模块
                </li>
                <li>
                  歌词滚动bug
                </li>
                <li>
                  如果在使用过程中遇到任何问题，可以在
                  <a
                    href="https://github.com/cwzp990/react-music-ts"
                    target="_Blank"
                  >
                    <Icon type="github" />
                  </a>
                  上给我提Issues，或者您发现问题并有非常好的解决方案，欢迎PR
                </li>
              </ul>
            </Paragraph>
          </Typography>
        </Modal>
      </div>
    )
  }
}

export default Tips
