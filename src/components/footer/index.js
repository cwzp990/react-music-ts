import React from "react"
import { NavLink } from "react-router-dom"

import "./index.scss"

function Footer() {
	return (
		<div className="music-footer">
			<NavLink to="/discover" activeClassName="active">
				<i className="iconfont icon-discover"></i>
				<span>发现</span>
			</NavLink>
			<NavLink to="/video" activeClassName="active">
				<i className="iconfont icon-video"></i>
				<span>视频</span>
			</NavLink>
			<NavLink to="/mine" activeClassName="active">
				<i className="iconfont icon-music"></i>
				<span>我的</span>
			</NavLink>
			<NavLink to="/friend" activeClassName="active">
				<i className="iconfont icon-friends"></i>
				<span>云村</span>
			</NavLink>
		</div>
	)
}

export default React.memo(Footer)
