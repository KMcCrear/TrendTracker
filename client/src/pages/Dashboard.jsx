import React, { useState, useEffect } from "react";
import { CandleStick } from "../components/CandleStick";
import { returnDataToChart } from "../helpers/updateOnSearch";

let someData = null;
console.log(someData);

function retriveData() {
	someData = returnDataToChart();
}

function Dashboard() {
	const [chartData, setChartData] = useState();

	if (someData != null) {
		setChartData(someData);
	}

	return (
		<div className="dashboardContainer">
			<h1>Dashboard</h1>
			<CandleStick series={chartData} />

		</div>
	);
}

export { Dashboard, retriveData };

