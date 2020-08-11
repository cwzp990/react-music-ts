import React from "react"
import { renderRoutes } from "react-router-config"
import Header from "../components/header"
import Footer from "../components/footer"
import Player from "../components/player"

import "./index.scss"

function Home(props) {
	const { route } = props

	return (
		<div className="music-wrapper">
			<Header />
			<div className="music-main">{renderRoutes(route.routes)}</div>
			<Footer />
			<Player />
		</div>
	)
}

export default React.memo(Home)
