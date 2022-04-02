import "./App.css";
import { NavBar } from "./components/Navbar.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import Stocks from "./pages/Stocks";
import Crypto from "./pages/Crypto";
import Portfolio from "./pages/Portfolio";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useState } from "react";
import { useEffect } from "react";
import endPoint from "./helpers/endPoint";
import axios from "axios";
import jscookie from "js-cookie";

const App = () => {
	const [input, setInput] = useState();

	//getting state from cookies
	let s = jscookie.get("state");
	if (s) {
		s = JSON.parse(s);
	} else {
		s = { loggedIn: false };
	}
	const state = s;

	return (
		<div className="App">
			<NavBar input={input} setInput={setInput} state={state} />

			<Routes>
				<Route
					exact
					path="/"
					element={<Dashboard search={input} state={state} />}
				/>
				<Route
					path="/stock"
					element={<Stocks search={input} state={state} />}
				/>
				<Route
					path="/stock/:ticker"
					element={<Stocks search={input} state={state} />}
				/>
				<Route
					path="/crypto"
					element={<Crypto search={input} />}
					state={state}
				/>
				<Route
					path="/crypto/:coin"
					element={<Crypto search={input} />}
					state={state}
				/>
				<Route path="/portfolio" element={<Portfolio state={state} />} />
				<Route path="/login" element={<Login state={state} />} />
				<Route path="/register" element={<Register state={state} />} />
			</Routes>
		</div>
	);
};

export default App;
