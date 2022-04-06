import React from "react";
import makeChartData from "../helpers/makeChartData";

import BaseChart from "./BaseChart";

const CandleStick = (props)=>{
	const { search } = props;
	const { state } = props;
	const { what } = props;

	const options = {
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
		<BaseChart state={state} what={what} options={options} getData={makeChartData} search={search}/>
	);
}
export default CandleStick ;
