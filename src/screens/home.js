import React, { Component } from 'react'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'

import Talk from '../components/Talk'

class home extends Component {
	state = {
		talks: null
	}

	componentDidMount() {
		axios
			.get('/talks')
			.then((res) => {
				this.setState({
					talks: res.data
				})
			})
			.catch((err) => console.log(err))
	}
	render() {
		let recentTalksMarkup = this.state.talks ? (
			this.state.talks.map((talk) => <Talk key={talk.talkId} talk={talk} />)
		) : (
			<p>Loading...</p>
		)
		return (
			<Grid container spacing={16}>
				<Grid item sm={8} xs={12}>
					{recentTalksMarkup}
				</Grid>
				<Grid item sm={4} xs={12}>
					<p>Profile...</p>
				</Grid>
			</Grid>
		)
	}
}

export default home
