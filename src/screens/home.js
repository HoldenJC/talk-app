import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'

import Talk from '../components/talk/Talk'
import Profile from '../components/profile/Profile'
import TalkSkeleton from '../util/TalkSkeleton'

import { connect } from 'react-redux'
import { getTalks } from '../redux/actions/dataActions'

class home extends Component {
	componentDidMount() {
		this.props.getTalks()
	}
	render() {
		const { talks, loading } = this.props.data
		let recentTalksMarkup = !loading ? (
			talks.map((talk) => <Talk key={talk.talkId} talk={talk} />)
		) : (
			<TalkSkeleton />
		)

		return (
			<Grid container spacing={16}>
				<Grid item sm={8} xs={12}>
					{recentTalksMarkup}
				</Grid>
				<Grid item sm={4} xs={12}>
					<Profile />
				</Grid>
			</Grid>
		)
	}
}

home.propTypes = {
	getTalks : PropTypes.func.isRequired,
	data     : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	data : state.data
})

export default connect(mapStateToProps, { getTalks })(home)
