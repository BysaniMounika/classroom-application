import React, { useState, useEffect } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./components/login.component";
import SignUp from "./components/sign-up.component";
import Home from './js/home';
import CreateCourse from './js/create-course';
import MarkAttendance from './js/mark-attendance';

function App(props) {
	const [user, setUser] = useState('');

	useEffect(() => {
		async function init() {
			const data = await sessionStorage.getItem('userDetails');
			setUser(JSON.parse(data));
		}
		init();
	}, []);

	return (
		<Router>
			<div className="App">
				<Switch>
					<Route exact path='/' component={Login} />
					<Route path="/login" component={Login} />
					<Route path="/sign-up" component={SignUp} />
					<Route path="/home" component={Home} />
					<Route path="/create-course" component={CreateCourse} />
					<Route path="/mark-attendance" component={MarkAttendance} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;