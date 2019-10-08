import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import NavButton from '../../util/NavButton'
import LikeButton from './LikeButton'
import dayjs from 'dayjs'
import Comments from './Comments'
import CommentForm from './CommentForm'
import { Link } from 'react-router-dom'

// Redux imports
import { connect } from 'react-redux'
import { getTalk, clearErrors } from '../../redux/actions/dataActions'

// material ui imports
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

// material ui icons
import CloseIcon from '@material-ui/icons/Close'
import UnfoldMore from '@material-ui/icons/UnfoldMore'
import ChatIcon from '@material-ui/icons/Chat'

const styles = (theme) => ({
	...theme.themeStyle,
	profileImage  : {
		maxWidth     : 200,
		height       : 200,
		borderRadius : '50%',
		objectFit    : 'cover'
	},
	dialogContent : {
		padding : 20
	},
	closeButton   : {
		position : 'absolute',
		left     : '90%',
		top      : '4%'
	},
	expandTalk    : {
		position : 'absolute',
		left     : '90%'
	},
	spinner       : {
		textAlign    : 'center',
		marginTop    : 50,
		marginBottom : 50
	}
})

class TalkDialog extends Component {
	state = {
		open : false
	}
	handleOpen = () => {
		this.setState({ open: true })
		this.props.getTalk(this.props.talkId)
	}
	handleClose = () => {
		this.setState({ open: false })
		this.props.clearErrors()
	}

	render() {
		const {
			classes,
			talk    : { talkId, body, createdAt, likeCount, commentCount, userImage, userHandle, comments },
			UI      : { loading }
		} = this.props

		const dialogMarkup = loading ? (
			<div className={classes.spinner}>
				<CircularProgress size={200} thickness={2} />
			</div>
		) : (
			<Grid container spacing={16}>
				<Grid item sm={5}>
					<img src={userImage} alt="User" className={classes.profileImage} />
				</Grid>
				<Grid item sm={7}>
					<Typography component={Link} color="primary" variant="h5" to={`/users/${userHandle}`}>
						@{userHandle}
					</Typography>
					<hr className={classes.stealthSeparator} />
					<Typography variant="body2" color="textSecondary">
						{dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
					</Typography>
					<hr className={classes.stealthSeparator} />
					<Typography variant="body1">{body}</Typography>
					<LikeButton talkId={talkId} />
					<span>{likeCount} Likes</span>
					<NavButton tip="comments">
						<ChatIcon color="primary" />
					</NavButton>
					<span>{commentCount} Comments</span>
				</Grid>
				<hr className={classes.stealthSeparator} />
				<CommentForm talkId={talkId} />
				<Comments comments={comments} />
			</Grid>
		)
		return (
			<Fragment>
				<NavButton onClick={this.handleOpen} tip="Show comments" tipClassName={classes.expandTalk}>
					<UnfoldMore color="primary" />
				</NavButton>
				<Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
					<NavButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
						<CloseIcon />
					</NavButton>
					<DialogContent className={classes.dialogContent}>{dialogMarkup}</DialogContent>
				</Dialog>
			</Fragment>
		)
	}
}

TalkDialog.propTypes = {
	clearErrors : PropTypes.func.isRequired,
	getTalk     : PropTypes.func.isRequired,
	talkId      : PropTypes.string.isRequired,
	userHandle  : PropTypes.string.isRequired,
	talk        : PropTypes.object.isRequired,
	UI          : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	talk : state.data.talk,
	UI   : state.UI
})

const mapActionsToProps = {
	getTalk,
	clearErrors
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(TalkDialog))
