import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

import addToWatchlist from "../helpers/addToWatchlist";
import hasWatchlistItem from "../helpers/hasWatchlistItem";
import deleteFromWatchlist from "../helpers/deleteFromWatchlist";

const BaseChart = (props) => {
	const { state } = props;
	const { what } = props;
    const { options } = props;
    const { getData } = props;
    const constSearch = props.search;
    const [search,setSearch] = useState(constSearch);

	const [portfolioButton,setPortfolioButton] = useState();
	const [data,setData] = useState([])

	const updateData = async()=>{
		setData(await getData(search))
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

	return (
		<div id="chart" style={{height: '100%'}}>
			<Chart
				height={'100%'}
				options={options}
				series={[{data}]}
				type={options.chart.type}
			/>
			<div id="chartButtons">
				<div>
					{portfolioButton}
				</div>
				<div>
					<button onClick={() => setSearch(constSearch)}>1d</button>
					<button onClick={() => setSearch(constSearch + '?range=week')}>7d</button>
					<button onClick={() => setSearch(constSearch + '?range=month')}>30d</button>
					<button onClick={() => setSearch(constSearch + '?range=quarter')}>90d</button>
					<button onClick={() => setSearch(constSearch + '?range=year')}>1y</button>
					<button onClick={() => setSearch(constSearch + '?range=2year')}>2y</button>
				</div>
			</div>
			
		</div>
	);
}

export default BaseChart;

//<button onClick={updateData}>Refresh</button>