import "./App.css";
import NavBar from "./components/Navbar.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Stocks from "./pages/Stocks";
import Crypto from "./pages/Crypto";

function App() {
	return (
		<div className="App">
			<NavBar />

			<Routes>
				<Route exact path="/" element={<Dashboard />} />
				<Route path="/Stocks" element={<Stocks />} />
				<Route path="/crypto" element={<Crypto />} />
			</Routes>
		</div>
	);
}

export default App;
