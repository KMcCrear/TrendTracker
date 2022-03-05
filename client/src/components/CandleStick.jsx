import React from "react";
import Chart from "react-apexcharts";
import makeChartData from "../helpers/makeChartData";

class CandleStick extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			series: [
				{
					data: []
				},
			],
			options: {
				chart: {
					type: "candlestick",
					height: 350,
				},
				title: {
					text: "",
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


	componentDidMount() {
		this.update();
		//setInterval(this.update.bind(this),5000);
	}

	async update() {
		const data = await makeChartData(this.props.ticker);
		console.log(data);
		this.setState({ series: [{ data: data }] });
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
				<button onClick={this.update.bind(this)}>Refresh</button>
			</div>
		);
	}
}

export { CandleStick };
