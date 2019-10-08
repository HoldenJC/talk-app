import React, { Fragment } from 'react'
import NoImg from '../images/no-img.svg'
import PropTypes from 'prop-types'

// material ui imports
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = (theme) => ({
	...theme.themeStyle,
	card              : {
		position : 'relative',
		display  : 'flex',
		margin   : 20
	},
	cardConent        : {
		width         : '100%',
		flexDirection : 'column',
		padding       : 25,
		objectFit     : 'cover'
	},
	cover             : {
		minWidth : 200
	},
	handlePlaceholder : {
		width           : 60,
		height          : 18,
		backgroundColor : theme.palette.primary.main,
		marginBottom    : 7
	},
	datePlaceholder   : {
		width           : 100,
		height          : 14,
		backgroundColor : 'rgba(0,0,0,0.4)',
		marginBottom    : 10
	},
	fullLine          : {
		width           : '90%',
		height          : 15,
		backgroundColor : 'rgba(0,0,0,0.6)',
		marginBottom    : 10
	},
	halfLine          : {
		width           : '60%',
		height          : 15,
		backgroundColor : theme.palette.primary.main,
		marginBottom    : 10
	}
})

const TalkSkeleton = (props) => {
	const { classes } = props
	const content = Array.from({
		length : 5
	}).map((item, index) => (
		<Card className={classes.card} key={index}>
			<CardMedia className={classes.cover} image={NoImg} />
			<CardContent className={classes.cardConent}>
				<div className={classes.handlePlaceholder} />
				<div className={classes.datePlaceholder} />
				<div className={classes.fullLine} />
				<div className={classes.fullLine} />
				<div className={classes.halfLine} />
			</CardContent>
		</Card>
	))

	return <Fragment>{content}</Fragment>
}

TalkSkeleton.propTypes = {
	classes : PropTypes.object.isRequired
}

export default withStyles(styles)(TalkSkeleton)
