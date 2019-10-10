import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import Icon from '../images/logo.svg'
import { Link } from 'react-router-dom'

// material ui imports
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

// Redux imports
import { connect } from 'react-redux'
import { loginUser } from '../redux/actions/userActions'

const styles = (theme) => ({
	...theme.themeStyle
})

class login extends Component {
	constructor() {
		super()
		this.state = {
			email    : '',
			password : '',
			errors   : {}
		}
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.UI.errors) {
			this.setState({ errors: nextProps.UI.errors })
		}
	}

	handleSubmit = (event) => {
		event.preventDefault()
		const userData = {
			email    : this.state.email,
			password : this.state.password
		}
		this.props.loginUser(userData, this.props.history)
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	render() {
		const { classes, UI: { loading } } = this.props
		const { errors } = this.state
		return (
			<Grid container className={classes.form}>
				<Grid item sm />
				<Grid item sm>
					<img src={Icon} alt="" className={classes.image} />
					<Typography variant="h2" className={classes.screenTitle}>
						Login to Talk
					</Typography>
					<form noValidate onSubmit={this.handleSubmit}>
						<TextField
							id="email"
							name="email"
							type="email"
							label="Email"
							className={classes.textField}
							helperText={errors.email}
							error={errors.email ? true : false}
							value={this.state.email}
							onChange={this.handleChange}
							fullWidth
						/>
						<TextField
							id="password"
							name="password"
							type="password"
							label="Password"
							className={classes.textField}
							helperText={errors.password}
							error={errors.password ? true : false}
							value={this.state.password}
							onChange={this.handleChange}
							fullWidth
						/>
						{errors.general && (
							<Typography variant="body2" className={classes.customError}>
								{errors.general}
							</Typography>
						)}
						<Button
							type="submit"
							variant="contained"
							color="primary"
							className={classes.button}
							disabled={loading}
						>
							Login
							{loading && <CircularProgress size={30} className={classes.progress} />}
						</Button>
						<br />
						<br />
						<small>
							No account? <Link to="/signup">Sign up here</Link>
						</small>
					</form>
				</Grid>
				<Grid item sm />
			</Grid>
		)
	}
}

login.propTypes = {
	classes   : PropTypes.object.isRequired,
	loginUser : PropTypes.func.isRequired,
	user      : PropTypes.object.isRequired,
	UI        : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	user : state.user,
	UI   : state.UI
})

export default connect(mapStateToProps, { loginUser })(withStyles(styles)(login))
