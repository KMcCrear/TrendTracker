import React, { useEffect, useState, useRef } from "react";
import Chart from "react-apexcharts";

class TimeSeries extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			series: [
				{
					name: "Price",
					data: props.data,
				},
			],
			options: {
				chart: {
					type: "area",
					stacked: false,
					height: 350,
					zoom: {
						type: "x",
						enabled: true,
						autoScaleYaxis: true,
					},
					toolbar: {
						autoSelected: "zoom",
					},
				},
				dataLabels: {
					enabled: false,
				},
				markers: {
					size: 0,
				},
				title: {
					text: `${props.name} Stock Price Movement`,
					align: "left",
				},
				fill: {
					type: "gradient",
					gradient: {
						shadeIntensity: 1,
						inverseColors: false,
						opacityFrom: 0.5,
						opacityTo: 0,
						stops: [0, 90, 100],
					},
				},
				yaxis: {
					labels: {
						formatter: function (val) {
							return (val / 1000000).toFixed(0);
						},
					},
					title: {
						text: "Volume",
					},
				},
				xaxis: {
					type: "datetime",
				},
				tooltip: {
					shared: false,
					y: {
						formatter: function (val) {
							return (val / 1000000).toFixed(0);
						},
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
					type="area"
					height={350}
				/>
			</div>
		);
	}
}

export default TimeSeries;
