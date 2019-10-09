import React, { Fragment } from 'react'
import NoImg from '../images/no-img.svg'
import PropTypes from 'prop-types'

// material ui imports
import withStyles from '@material-ui/core/styles/withStyles'

const styles = (theme) => ({
	...theme.themeStyle,
	storyImagePlaceholder : {
		height          : 200,
		width           : '100%',
		backgroundColor : 'rgba(0,0,0,0.6)',
		objectFit       : 'cover',
		display         : 'block',
		margin          : 'auto',
		padding         : '0px 0px 10px 0px'
	},
	timeStylePlaceholder  : {
		height          : 20,
		backgroundColor : 'rgba(0,0,0,0.3)',
		width           : 60,
		margin          : '7px auto 7px auto'
	},
	titleLine             : {
		height          : 15,
		backgroundColor : theme.palette.primary.main,
		width           : '100%',
		marginBottom    : 10
	},
	descLine              : {
		height          : 15,
		backgroundColor : 'rgba(0,0,0,0.6)',
		width           : '100%',
		marginBottom    : 10
	}
})

const NewsSkeleton = (props) => {
	const { classes } = props

	return (
		<div className={classes.slideDiv}>
			<div className={classes.storyImagePlaceholder} />
			<div className={classes.timeStylePlaceholder} />
			<hr className={classes.stealthSeparator} />
			<div className={classes.titleLine} />
			<hr className={classes.stealthSeparator} />
			<div className={classes.titleLine} />
			<hr className={classes.stealthSeparator} />
			<div className={classes.descLine} style={{ marginTop: 20 }} />
			<div className={classes.descLine} />
			<div className={classes.descLine} />
		</div>
	)
}

NewsSkeleton.propTypes = {
	classes : PropTypes.object.isRequired
}

export default withStyles(styles)(NewsSkeleton)
