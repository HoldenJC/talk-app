import React, { Component } from 'react'
import NavButton from '../../util/NavButton'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

// material ui icon imports
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'

// Redux imports
import { connect } from 'react-redux'
import { likeTalk, unlikeTalk } from '../../redux/actions/dataActions'

class LikeButton extends Component {
	likedTalk = () => {
		if (this.props.user.likes && this.props.user.likes.find((like) => like.talkId === this.props.talkId))
			return true
		else return false
	}

	likeTalk = () => {
		this.props.likeTalk(this.props.talkId)
	}
	unlikeTalk = () => {
		this.props.unlikeTalk(this.props.talkId)
	}

	render() {
		const { authenticated } = this.props.user
		const likeButton = !authenticated ? (
			<Link to="/login">
				<NavButton tip="like">
					<FavoriteBorder color="primary" />
				</NavButton>
			</Link>
		) : this.likedTalk() ? (
			<NavButton tip="unlike" onClick={this.unlikeTalk}>
				<FavoriteIcon color="primary" />
			</NavButton>
		) : (
			<NavButton tip="like" onClick={this.likeTalk}>
				<FavoriteBorder color="primary" />
			</NavButton>
		)
		return likeButton
	}
}

LikeButton.propTypes = {
	user       : PropTypes.object.isRequired,
	talkId     : PropTypes.string.isRequired,
	likeTalk   : PropTypes.func.isRequired,
	unlikeTalk : PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
	user : state.user
})

const mapActionsToProps = {
	likeTalk,
	unlikeTalk
}

export default connect(mapStateToProps, mapActionsToProps)(LikeButton)
