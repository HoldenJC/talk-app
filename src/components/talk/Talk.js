import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types'
import NavButton from '../../util/NavButton'
import DeleteTalk from './DeleteTalk'
import TalkDialog from './TalkDialog'
import LikeButton from './LikeButton'

// material ui imports
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'

// material ui icons
import ChatIcon from '@material-ui/icons/Chat'

// Redux imports
import { connect } from 'react-redux'

const styles = {
	card    : {
		position : 'relative',
		display  : 'flex',
		margin   : 20
	},
	image   : {
		minWidth : 200
	},
	content : {
		padding   : 25,
		objectFit : 'cover'
	}
}

class Talk extends Component {
	render() {
		dayjs.extend(relativeTime)
		const {
			classes,
			user    : { authenticated, credentials: { handle } },
			talk    : { body, createdAt, userImage, userHandle, talkId, likeCount, commentCount }
		} = this.props

		const deleteButton = authenticated && userHandle === handle ? <DeleteTalk talkId={talkId} /> : null
		return (
			<Card className={classes.card}>
				<CardMedia image={userImage} title="Profile Picture" className={classes.image} />
				<CardContent className={classes.content}>
					<Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">
						{userHandle}
					</Typography>
					{deleteButton}
					<Typography variant="body2" color="textSecondary">
						{dayjs(createdAt).fromNow()}
					</Typography>
					<Typography variant="body1" color="textPrimary">
						{body}
					</Typography>
					<LikeButton talkId={talkId} />
					<span>{likeCount} Likes</span>
					<NavButton tip="comments">
						<ChatIcon color="primary" />
					</NavButton>
					<span>{commentCount} Comments</span>
					<TalkDialog talkId={talkId} userHandle={userHandle} openDialog={this.props.openDialog} />
				</CardContent>
			</Card>
		)
	}
}

Talk.propTypes = {
	user       : PropTypes.object.isRequired,
	talk       : PropTypes.object.isRequired,
	classes    : PropTypes.object.isRequired,
	openDialog : PropTypes.bool
}

const mapStateToProps = (state) => ({
	user : state.user
})

export default connect(mapStateToProps)(withStyles(styles)(Talk))
