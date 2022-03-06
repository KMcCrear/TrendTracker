import "./App.css";
import {NavBar} from "./components/Navbar.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import Stocks from "./pages/Stocks";
import Crypto from "./pages/Crypto";
import { useState } from "react";

function App() {
	
	const [input,setInput] = useState();

	return (
		<div className="App">
			<NavBar input={input} setInput={setInput}/>

			<Routes>
				<Route exact path="/" element={<Dashboard search={input} />} />
				<Route path="/Stocks" element={<Stocks search={input} />} />
				<Route path="/crypto" element={<Crypto search={input} />} />
			</Routes>
		</div>
	);
}

export default App;