import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import EditDetails from './EditDetails'
import NavButton from '../../util/NavButton'
import ProfileSkeleton from '../../util/ProfileSkeleton'

// material ui imports
import Button from '@material-ui/core/Button'
import MuiLink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

// Redux imports
import { connect } from 'react-redux'
import { logoutUser, uploadImage } from '../../redux/actions/userActions'

// material ui icons
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'
import EditIcon from '@material-ui/icons/Edit'
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'

const styles = (theme) => ({
	...theme.themeStyle
})

class Profile extends Component {
	handleImageChange = (event) => {
		const image = event.target.files[0]
		const formData = new FormData()
		formData.append('image', image, image.name)
		this.props.uploadImage(formData)
	}

	handleEditImage = () => {
		const fileInput = document.getElementById('imageChange')
		fileInput.click()
	}

	handleLogout = () => {
		this.props.logoutUser()
	}

	render() {
		const {
			classes,
			user    : { credentials: { handle, createdAt, imageUrl, bio, website, location }, loading, authenticated }
		} = this.props

		let profileMarkup = !loading ? authenticated ? (
			<Paper className={classes.paper}>
				<div className={classes.profile}>
					<div className="image-wrapper">
						<img src={imageUrl} alt="user profile" className="profile-image" />
						<input type="file" id="imageChange" onChange={this.handleImageChange} hidden="hidden" />

						<NavButton
							tip="Edit profile picture"
							onClick={this.handleEditImage}
							btnClassName="button"
							placement="top"
						>
							<EditIcon color="primary" />
						</NavButton>
					</div>
					<hr />
					<div className="profile-details">
						<MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
							@{handle}
						</MuiLink>
						<hr />
						{bio && <Typography variant="body2">{bio}</Typography>}
						<hr />
						{location && (
							<Fragment>
								<LocationOn color="primary" />{' '}
								<span>
									<a
										href={`https://www.google.com/maps/search/${location}`}
										target="_blank"
										rel="noopener noreferrer"
									>
										{location}
									</a>
								</span>
								<hr />
							</Fragment>
						)}
						{website && (
							<Fragment>
								<LinkIcon color="primary" />
								<a href={website} target="_blank" rel="noopener noreferrer">
									{' '}
									{website}
								</a>
								<hr />
							</Fragment>
						)}
						<CalendarToday color="primary" /> <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
					</div>
					<NavButton tip="Logout" onClick={this.handleLogout} btnClassName="button" placement="right">
						<KeyboardReturn color="secondary" />
					</NavButton>
					<EditDetails />
				</div>
			</Paper>
		) : (
			<Paper className={classes.paper}>
				<Typography variant="body2" align="center">
					Login or make an account to view your profile
				</Typography>
				<div className={classes.buttons}>
					<Button variant="contained" color="primary" component={Link} to="/login">
						Login
					</Button>
					<Button variant="contained" color="secondary" component={Link} to="/signup">
						Signup
					</Button>
				</div>
			</Paper>
		) : (
			<ProfileSkeleton />
		)

		return profileMarkup
	}
}

const mapStateToProps = (state) => ({
	user : state.user
})

const mapActionsToProps = { logoutUser, uploadImage }

Profile.propTypes = {
	logoutUser  : PropTypes.func.isRequired,
	uploadImage : PropTypes.func.isRequired,
	user        : PropTypes.object.isRequired,
	classes     : PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile))
