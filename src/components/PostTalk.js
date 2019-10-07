import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import NavButton from '../util/NavButton'

// Redux imports
import { connect } from 'react-redux'
import { postTalk } from '../redux/actions/dataActions'

// Material UI imports
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import CircularProgress from '@material-ui/core/CircularProgress'

// material ui icon imports
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'

const styles = (theme) => ({
	...theme.themeStyle,
	submitButton    : {
		position : 'relative'
	},
	progressSpinner : {
		position : 'absolute'
	},
	closeButton     : {
		position : 'absolute',
		left     : '90%',
		top      : '10%'
	}
})

class PostTalk extends Component {
	state = {
		open   : false,
		body   : '',
		errors : {}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.UI.errors) {
			this.setState({
				errors : nextProps.UI.errors
			})
		}
		if (!nextProps.UI.errors && !nextProps.UI.loading) {
			this.setState({
				body : ''
			})
			this.handleClose()
		}
	}

	handleOpen = () => {
		this.setState({ open: true })
	}
	handleClose = () => {
		this.setState({ open: false, errors: {} })
	}
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	handleSubmit = (event) => {
		event.preventDefault()
		this.props.postTalk({
			body : this.state.body
		})
	}

	render() {
		const { errors } = this.state
		const { classes, UI: { loading } } = this.props
		return (
			<Fragment>
				<NavButton onClick={this.handleOpen} tip="Start talking">
					<AddIcon />
				</NavButton>
				<Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
					<NavButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
						<CloseIcon />
					</NavButton>
					<DialogTitle>Start talking</DialogTitle>
					<DialogContent>
						<form onSubmit={this.handleSubmit}>
							<TextField
								name="body"
								type="text"
								label="Begin the conversation here"
								multiline
								rows="3"
								placeholder="The...."
								error={errors.body ? true : false}
								helperText={errors.body}
								className={classes.textField}
								onChange={this.handleChange}
								fullWidth
								InputLabelProps={{
									classes : {
										root : classes.label
									}
								}}
								InputProps={{
									classes : {
										root : classes.underline
									}
								}}
							/>
							<Button
								type="submit"
								variant="contained"
								color="primary"
								className={classes.submitButton}
								disabled={loading}
							>
								Submit
								{loading && <CircularProgress size={30} className={classes.progressSpinner} />}
							</Button>
						</form>
					</DialogContent>
				</Dialog>
			</Fragment>
		)
	}
}

PostTalk.propTypes = {
	postTalk : PropTypes.func.isRequired,
	UI       : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	UI : state.UI
})

export default connect(mapStateToProps, { postTalk })(withStyles(styles)(PostTalk))
