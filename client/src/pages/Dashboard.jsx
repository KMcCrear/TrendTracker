import React, { useState, useEffect, useCallback } from "react";
import { CandleStick } from "../components/CandleStick";
import { returnDataToChart } from "../helpers/updateOnSearch";

const Dashboard = () => {
	const [chart, setChart] = useState(<CandleStick series={[]} />);
	const getData = () => {
		const data = returnDataToChart();
		console.log(data);
		setChart(<CandleStick series={data} />);
	};
	return (
		<div className="dashboardContainer">
			<h1>Dashboard</h1>
			{chart}
			<button onClick={() => getData()}>Update data</button>
		</div>
	);
};

export { Dashboard };
