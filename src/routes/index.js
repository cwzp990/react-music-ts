import React from "react"
import { Redirect } from "react-router-dom"

import BlankLayout from "../layout/blank"
import HomeLayout from "../layout/home"
import Discover from "../pages/discover"
import Video from "../pages/video"
import Mine from "../pages/mine"
import Friend from "../pages/friend"

const routes = [
	{
		component: BlankLayout,
		routes: [
			{
				path: "/",
				component: HomeLayout,
				routes: [
					{
						path: "/",
						exact: true,
						render: () => <Redirect to={"/discover"} />,
					},
					{
						path: "/discover",
						component: Discover,
					},
					{
						path: "/video",
						component: Video,
					},
					{
						path: "/mine",
						component: Mine,
					},
					{
						path: "/friend",
						component: Friend,
					},
				],
			},
		],
	},
]

export default routes
