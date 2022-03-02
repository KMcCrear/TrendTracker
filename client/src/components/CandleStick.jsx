import React from "react";
import Chart from "react-apexcharts";

const updataChart = (userQuery) => {
	CandleStick.updateSeries([{ data: userQuery }]);
};

class CandleStick extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			series: [
				{
					data: [],
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
		this.setState({ series: [{ data: this.props.series }] });
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

export { CandleStick, updataChart };
