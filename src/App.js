import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

// components
import Navbar from './components/Navbar'

// screens
import home from './screens/home'
import login from './screens/login'
import signup from './screens/signup'

const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#757de8',
			main: '#3F51B5',
			dark: '#002984',
			contrastText: '#fff'
		},
		secondary: {
			light: '#ffb04c',
			main: '#F57F17',
			dark: '#bc5100',
			contrastText: '#000'
		}
	},
	typography: {
		useNextVariants: true
	}
})

class App extends Component {
	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<div className="App">
					<Router>
						<Navbar />
						<div className="container">
							<Switch>
								<Route exact path="/" component={home} />
								<Route exact path="/login" component={login} />
								<Route exact path="/signup" component={signup} />
							</Switch>
						</div>
					</Router>
				</div>
			</MuiThemeProvider>
		)
	}
}

export default App
