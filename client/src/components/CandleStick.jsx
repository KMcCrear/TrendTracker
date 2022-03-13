import React, { useEffect, useState, useRef } from "react";
import Chart from "react-apexcharts";
import makeChartData from "../helpers/makeChartData";

const CandleStick = (props)=>{
	const {search} =props;
	const [data,setData] = useState([])
	const options = useRef({
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
	},)

	const updateData = async()=>{
		const newData = await makeChartData(search.toUpperCase());
		setData(newData);
	}

	useEffect(()=>{
		const fetchData = async()=>{
			await updateData();
		}
		fetchData();
	},[search])

	if(data.length > 0){
	return (
		<div id="chart">
			<Chart
				options={options.current}
				series={[{data}]}
				type="candlestick"
				height={350}
			/>
			<button onClick={updateData}>Refresh</button>
		</div>
	);
	}
	return(<div>Search for a ticker name to display candle chart</div>)
}
export { CandleStick };
