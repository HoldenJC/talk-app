import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import NavButton from '../util/NavButton'

// material ui imports
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'

// material ui icons
import DeleteOutline from '@material-ui/icons/DeleteOutline'

import { connect } from 'react-redux'
import { deleteTalk } from '../redux/actions/dataActions'
import theme from '../util/theme'

const styles = {
	...theme.themeStyle,
	dialogTitle   : {
		textAlign : 'center'
	},
	cancelButton  : {
		float     : 'left',
		margin    : '0 auto',
		textAlign : 'center'
	},
	confirmButton : {
		float     : 'right',
		margin    : '0 auto',
		textAlign : 'center'
	},
	deleteButton  : {
		position : 'absolute',
		left     : '90%',
		top      : '10%'
	}
}

class DeleteTalk extends Component {
	state = {
		open : false
	}
	handleOpen = () => {
		this.setState({
			open : true
		})
	}
	handleClose = () => {
		this.setState({
			open : false
		})
	}
	deleteTalk = () => {
		this.props.deleteTalk(this.props.talkId)
		this.setState({
			open : false
		})
	}

	render() {
		const { classes } = this.props
		return (
			<Fragment>
				<NavButton tip="Delete" onClick={this.handleOpen} btnClassName={classes.deleteButton}>
					<DeleteOutline color="secondary" />
				</NavButton>
				<Dialog open={this.state.open} onClose={this.handleClose} maxWidth="sm">
					<DialogTitle className={classes.dialogTitle}>Confirm deletion?</DialogTitle>
					<DialogActions>
						<Button className={classes.cancelButton} onClick={this.handleClose} color="primary">
							Cancel
						</Button>
						<Button className={classes.confirmButton} onClick={this.deleteTalk} color="secondary">
							Delete
						</Button>
					</DialogActions>
				</Dialog>
			</Fragment>
		)
	}
}

DeleteTalk.propTypes = {
	deleteTalk : PropTypes.func.isRequired,
	classes    : PropTypes.object.isRequired,
	talkId     : PropTypes.string.isRequired
}

export default connect(null, { deleteTalk })(withStyles(styles)(DeleteTalk))
