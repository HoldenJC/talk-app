import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import NavButton from '../../util/NavButton'
import LogoIcon from '../../images/logo.svg'
import PostTalk from '../talk/PostTalk'
import Notifications from './Notifications'

// material ui imports
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

class Navbar extends Component {
	render() {
		const { authenticated } = this.props
		return (
			<AppBar>
				<Toolbar className="nav-container">
					{authenticated ? (
						<Fragment>
							<PostTalk />
							<Link to="/">
								<NavButton tip="Home">
									<img src={LogoIcon} alt="Home" style={{ width: '35px' }} />
								</NavButton>
							</Link>
							<Notifications />
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
	authenticated : PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
	authenticated : state.user.authenticated
})

export default connect(mapStateToProps)(Navbar)
