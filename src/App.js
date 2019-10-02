import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'

// components
import Navbar from './components/Navbar'

// screens
import home from './screens/home'
import login from './screens/login'
import signup from './screens/signup'

class App extends Component {
	render() {
		return (
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
		)
	}
}

export default App
