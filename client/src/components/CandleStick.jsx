import React, { useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import endPoint from "../helpers/endPoint";

const getFinanceData = () => {
	return axios
		.post(`${endPoint()}/data`, {
			userQuery: "AAPL",
		})
		.then((response) => response);
};

const makeChartData = () => {
	let dataArray = getFinanceData().then((response) => response.value);
	console.log(dataArray);
	const chartArray = [];
	dataArray.forEach((entry) => {
		chartArray.push([
			{
				x: new Date(entry.timeStamp),
				y: [entry.open, entry.high, entry.low, entry.close],
			},
		]);
	});
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
