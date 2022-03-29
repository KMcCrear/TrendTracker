import React, { useEffect, useState, useRef } from "react";
import Chart from "react-apexcharts";
import makeChartData from "../helpers/makeChartData";
import {Alert} from 'antd'
import addToWatchlist from "../helpers/addToWatchlist";
import axios from "axios";

const CandleStick = (props)=>{
	const {search} =props;
	const {state} = props;
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

	if(data.length>0){
		let button;
		if (state.loggedIn) {
			button = <button onClick={() => addToWatchlist(search,'stock')}>Add to portfolio</button>
		}
		return (
			<div id="chart">
				<Chart
					width={700}
					options={options.current}
					series={[{data}]}
					type="candlestick"
					height={350}
				/>
				<button onClick={updateData}>Refresh</button>
				{button}
			</div>
		);
	}
	return(<Alert type='warning' message={`No stock data found for ${search}`}/>)
}
export default CandleStick ;
