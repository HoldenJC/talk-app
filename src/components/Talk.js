import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types'
import NavButton from '../util/NavButton'
import DeleteTalk from './DeleteTalk'

// material ui imports
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'

// material ui icons
import ChatIcon from '@material-ui/icons/Chat'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'

// Redux imports
import { connect } from 'react-redux'
import { likeTalk, unlikeTalk } from '../redux/actions/dataActions'
import { SET_TALKS } from '../redux/types'

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
	likedTalk = () => {
		if (this.props.user.likes && this.props.user.likes.find((like) => like.talkId === this.props.talk.talkId))
			return true
		else return false
	}

	likeTalk = () => {
		this.props.likeTalk(this.props.talk.talkId)
	}
	unlikeTalk = () => {
		this.props.unlikeTalk(this.props.talk.talkId)
	}
	render() {
		dayjs.extend(relativeTime)
		const {
			classes,
			user    : { authenticated, credentials: { handle } },
			talk    : { body, createdAt, userImage, userHandle, talkId, likeCount, commentCount }
		} = this.props
		const likeButton = !authenticated ? (
			<NavButton tip="like">
				<Link to="/login">
					<FavoriteBorder color="primary" />
				</Link>
			</NavButton>
		) : this.likedTalk() ? (
			<NavButton tip="unlike" onClick={this.unlikeTalk}>
				<FavoriteIcon color="primary" />
			</NavButton>
		) : (
			<NavButton tip="like" onClick={this.likeTalk}>
				<FavoriteBorder color="primary" />
			</NavButton>
		)
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
					{likeButton}
					<span>{likeCount} Likes</span>
					<NavButton tip="comments">
						<ChatIcon color="primary" />
					</NavButton>
					<span>{commentCount} Comments</span>
				</CardContent>
			</Card>
		)
	}
}

Talk.propTypes = {
	likeTalk   : PropTypes.func.isRequired,
	unlikeTalk : PropTypes.func.isRequired,
	user       : PropTypes.object.isRequired,
	talk       : PropTypes.object.isRequired,
	classes    : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	user : state.user
})

const mapActionsToProps = {
	likeTalk,
	unlikeTalk
}
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Talk))
