import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Talk from '../components/talk/Talk'
import StaticProfile from '../components/profile/StaticProfile'
import TalkSkeleton from '../util/TalkSkeleton'

// materiaul ui imports
import Grid from '@material-ui/core/Grid'

// Redux imports
import { connect } from 'react-redux'
import { getUserData } from '../redux/actions/dataActions'

class user extends Component {
	state = {
		profile     : null,
		talkIdParam : null
	}
	componentDidMount() {
		const handle = this.props.match.params.handle
		const talkId = this.props.match.params.talkId

		if (talkId) this.setState({ talkIdParam: talkId })

		this.props.getUserData(handle)
		axios
			.get(`/user/${handle}`)
			.then((res) => {
				this.setState({
					profile : res.data.user
				})
			})
			.catch((err) => console.log(err))
	}

	render() {
		const { talks, loading } = this.props.data
		const { talkIdParam } = this.state

		const talksMarkup = loading ? (
			<TalkSkeleton />
		) : talks === null ? (
			<p>No talks yet from this user!</p>
		) : !talkIdParam ? (
			talks.map((talk) => <Talk key={talk.talkId} talk={talk} />)
		) : (
			talks.map((talk) => {
				if (talk.talkId !== talkIdParam) return <Talk key={talk.talkId} talk={talk} />
				else return <Talk key={talk.talkId} talk={talk} openDialog />
			})
		)

		return (
			<Grid container spacing={16}>
				<Grid item sm={8} xs={12}>
					{talksMarkup}
				</Grid>
				<Grid item sm={4} xs={12}>
					{this.state.profile === null ? (
						<p>Loading profile...</p>
					) : (
						<StaticProfile profile={this.state.profile} />
					)}
				</Grid>
			</Grid>
		)
	}
}

user.propTypes = {
	getUserData : PropTypes.func.isRequired,
	data        : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	data : state.data
})

export default connect(mapStateToProps, { getUserData })(user)
