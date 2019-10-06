import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import NavButton from '../util/NavButton'

// material ui imports
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

// material UI icon imports
import AddIcon from '@material-ui/icons/Add'
import HomeIcon from '@material-ui/icons/Home'
import Notifications from '@material-ui/icons/Notifications'

class Navbar extends Component {
	render() {
		const { authenticated } = this.props
		return (
			<AppBar>
				<Toolbar className="nav-container">
					{authenticated ? (
						<Fragment>
							<NavButton tip="Start talking">
								<AddIcon />
							</NavButton>
							<Link to="/">
								<NavButton tip="Home">
									<HomeIcon />
								</NavButton>
							</Link>
							<NavButton tip="Notifications">
								<Notifications />
							</NavButton>
						</Fragment>
					) : (
						<Fragment>
							<Button color="inherit" component={Link} to="/login">
								Login
							</Button>
							<Button color="inherit" component={Link} to="/">
								Home
							</Button>
							<Button color="inherit" component={Link} to="/signup">
								Signup
							</Button>
						</Fragment>
					)}
				</Toolbar>
			</AppBar>
		)
	}
}

Navbar.propTypes = {
	authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
	authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Navbar)
