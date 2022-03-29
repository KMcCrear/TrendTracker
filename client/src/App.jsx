import "./App.css";
import { NavBar } from "./components/Navbar.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import Stocks from "./pages/Stocks";
import Crypto from "./pages/Crypto";
import Coins from "./pages/Coins";
import Portfolio from "./pages/Portfolio";
import { useState } from "react";
import { useEffect } from "react";
import endPoint from "./helpers/endPoint";
import axios from "axios";

const App = () => {
	const [input, setInput] = useState();
	const [state, setNewState] = useState({
		loggedIn: false,
		forename: null,
		surname: null,
		message: null
	});

	useEffect(() => {
		if (!state.loggedIn) {
			axios.get(`${endPoint()}/auth/login`,{withCredentials: true}).then((response) => {
				if (response.data != '') {
					const user = response.data;
					setNewState({
						loggedIn: true, 
						forename: user.forename, 
						surname: user.surname,
						message: `Welcome ${user.forename} ${user.surname}`
					})
				}
			});
		}
	}, [state.loggedIn]);

	return (
		<div className="App">
			<NavBar input={input} setInput={setInput} state={state}/>

			<Routes>
				<Route exact path="/" element={<Dashboard search={input} state={state}/>} />
				<Route path="/stocks" element={<Stocks search={input} />} />
				<Route path="/stocks/:ticker" element={<Stocks search={input} />} />
				<Route path="/crypto" element={<Crypto search={input} />} />
				<Route path="/coins/:coin" element={<Coins search={input} />} />
				<Route path="/portfolio" element={<Portfolio state={state} />} />
			</Routes>
		</div>
	);
};

export default App;
