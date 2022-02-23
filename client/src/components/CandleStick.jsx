import React, { useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import endPoint from "../helpers/endPoint";

const getFinanceData = () => {
	return axios
		.post(`${endPoint()}/polydata`, {
			userQuery: "AAPL",
		})
		.then((response) => response.data);
};

const makeChartData = () => {
	let dataObject = getFinanceData().then((response) => {
		return response.results;
	});

	//console.log(dataObject);
	for (let i = 0; i < dataObject.length; i++) {
		console.log(dataObject[i]);
	}
};

class CandleStick extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			series: [
				{
					data: makeChartData(),
				},
			],
			options: {
				chart: {
					type: "candlestick",
					height: 350,
				},
				title: {
					text: "CandleStick Chart",
					align: "left",
				},
				xaxis: {
					type: "datetime",
				},
				yaxis: {
					tooltip: {
						enabled: true,
					},
				},
			},
		};
	}

	render() {
		return (
			<div id="chart">
				<Chart
					options={this.state.options}
					series={this.state.series}
					type="candlestick"
					height={350}
				/>
			</div>
		);
	}
}

export default CandleStick;
