import React from "react";
import makeCoinData from "../helpers/makeCoinData";

import BaseChart from "./BaseChart";

const TimeSeries = (props) => {
	const { search } = props;
	const { state } = props;
	const { what } = props;

	const options = {
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
					return Math.round(val * 1) / 1;
				},
			},
			title: {
				text: "Price",
			},
		},
		xaxis: {
			type: "datetime",
		},
		tooltip: {
			shared: false,
			y: {
				formatter: function (val) {
					return Math.round(val * 100) / 100;
				},
			},
		},
		noData: {
			text: "No data found",
			align: 'center',
			verticalAlign: 'middle',
			offsetX: 0,
			offsetY: 0,
			style: {
				color: undefined,
				fontSize: '14px',
				fontFamily: undefined
			}
		}
	};

	return (
		<BaseChart state={state} what={what} options={options} getData={makeCoinData} search={search}/>
	)

}

export default TimeSeries;
