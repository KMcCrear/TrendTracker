import "./App.css";
import { NavBar } from "./components/Navbar.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import Stocks from "./pages/Stocks";
import Crypto from "./pages/Crypto";
import Coins from "./pages/Coins";
import Portfolio from "./pages/Portfolio";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useState } from "react";
import { useEffect } from "react";
import updateOnLogin from "./helpers/updateOnLogin";
import endPoint from "./helpers/endPoint";
import axios from "axios";

const App = () => {
	const [input, setInput] = useState();
	const [state, setNewState] = useState({
		loggedIn: false,
		firstname: null,
		surname: null,
		message: null,
	});
	axios.defaults.withCredentials = true;

	useEffect(() => {
		if (state.loggedIn) {
			return;
		}
		axios.get(`${endPoint()}/auth/login`).then((response) => {
			console.log("response was ", response.data);
			if (response.data.loggedIn === true) {
				updateOnLogin(onUpdate, response.data.user[0]);
			}
		});
	}, [state.loggedIn]);

	const onUpdate = (object) => {};

	return (
		<div className="App">
			<NavBar input={input} setInput={setInput} />

			<Routes>
				<Route exact path="/" element={<Dashboard search={input} />} />
				<Route path="/stocks" element={<Stocks search={input} />} />
				<Route path="/stocks/:ticker" element={<Stocks search={input} />} />
				<Route path="/crypto" element={<Crypto search={input} />} />
				<Route path="/coins/:coin" element={<Coins search={input} />} />
				<Route path="/portfolio" element={<Portfolio state={state} />} />
				<Route path="/login" element={<Login state={state} />} />
				<Route path="/register" element={<Register state={state} />} />
			</Routes>
		</div>
	);
};

export default App;
