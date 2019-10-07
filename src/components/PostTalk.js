import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import NavButton from '../util/NavButton'
import theme from '../util/theme'

// Redux imports
import { connect } from 'react-redux'
import { postTalk } from '../redux/actions/dataActions'

// Material UI imports
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import EditIcon from '@material-ui/icons/Edit'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = {
	...theme.themeStyle
}

class PostTalk extends Component {
	render() {
		return <div />
	}
}

PostTalk.propTypes = {
	postTalk : PropTypes.func.isRequired,
	UI       : PropTypes.object.isRequired
}

const mapStateToProps = () => ({
	UI : state.UI
})

export default connect(mapStateToProps, { postTalk })(withStyles(styles)(PostTalk))
