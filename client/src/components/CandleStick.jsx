import React, { useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import endPoint from "../helpers/endPoint";

const getFinanceData = async () => {
	return axios
		.post(`${endPoint()}/polydata`, {
			userQuery: "AAPL",
		})
		.then((response) => response.data);
};

const makeChartData = async () => {
	const arrayOfOb = [];
	let dataObject = await getFinanceData().then((response) => {
		return response.results;
	});

	dataObject.forEach((entry) => {
		arrayOfOb.push({
			x: new Date(entry.t),
			y: [entry.o, entry.h, entry.l, entry.c],
		});
	},);
	return arrayOfOb;
};

class CandleStick extends React.Component {
	constructor(props) {
		super(props);
		let data;
		makeChartData().then((array) => {
			data = array;
			console.log(data);
		});

		this.state = {
			series: [
				{
					data: data,
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
