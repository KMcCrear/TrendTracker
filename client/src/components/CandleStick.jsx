import React, { useEffect, useState, useRef } from "react";
import Chart from "react-apexcharts";
import makeChartData from "../helpers/makeChartData";
import {Alert} from 'antd'

import addToWatchlist from "../helpers/addToWatchlist";
import hasWatchlistItem from "../helpers/hasWatchlistItem";
import deleteFromWatchlist from "../helpers/deleteFromWatchlist";

const CandleStick = (props)=>{
	const propSearch = props.search?.toUpperCase();
	const { state } = props;
	const { what } = props;

	const [search,setSearch] = useState(propSearch);
	const [portfolioButton,setPortfolioButton] = useState();
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
		setData(await makeChartData(search))
		if (state.loggedIn) {
			const has = await hasWatchlistItem(search);
			const onAdd = () => {
				addToWatchlist(search,what)
				.then(() => setPortfolioButton(remove))
				.catch((err) => alert('unable'));
			}
			const onRemove = () => {
				deleteFromWatchlist(search)
				.then(() => setPortfolioButton(add))
				.catch((err) => alert('unable'));
			};
			const add = <button onClick={onAdd}>Add to portfolio</button>;
			const remove = <button onClick={onRemove}>Remove from portfolio</button>;
			if (has) {
				setPortfolioButton(remove);
			}
			else {
				setPortfolioButton(add);
			}
		};
	}

	useEffect(()=>{
		const fetchData = async()=>{
			await updateData();	
		}
		fetchData();
	},[search])

	if(data.length>0){
		return (
			<div id="chart">
				<Chart
					width={700}
					options={options.current}
					series={[{data}]}
					type="candlestick"
					height={350}
				/>
				<div id="chartButtons">
					<div>
						<button onClick={updateData}>Refresh</button>
						{portfolioButton}
					</div>
					<div>
						<button onClick={() => setSearch(propSearch)}>1d</button>
						<button onClick={() => setSearch(propSearch + '?range=week')}>7d</button>
						<button onClick={() => setSearch(propSearch + '?range=month')}>30d</button>
						<button onClick={() => setSearch(propSearch + '?range=quarter')}>90d</button>
						<button onClick={() => setSearch(propSearch + '?range=year')}>1y</button>
						<button onClick={() => setSearch(propSearch + '?range=2year')}>2y</button>
					</div>
				</div>
				
			</div>
		);
	}
	return(<Alert type='warning' message={`No stock data found for ${search}`}/>)
}
export default CandleStick ;
