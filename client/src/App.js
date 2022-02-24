import "./App.css";
import NavBar from "./components/Navbar.jsx";
import CandleStick from "./components/CandleStick.jsx";
import makeChartData from "./helpers/getFinanceData";

function App() {
	return (
		<div className="App">
			<nav>
				<NavBar />
			</nav>
			<CandleStick data={makeChartData()} />
		</div>
	);
}

export default App;
