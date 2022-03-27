import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import getFinanceData from "../helpers/getFinanceData";
import CandleStick from "../components/CandleStick";
import addToWatchList from "../helpers/addToWatchList";

export default function Stocks() {
	const history = useLocation();
	const params = history.pathname;
	const query = params.slice(8);

	useEffect(() => {
		if (query) {
			getFinanceData(query).then((data) => {
				console.log(data);
			});
		}
	});

	const addStockToWatchList = (e) => {
		e.preventDefault();
		const watchListID = query.toLowerCase().trim();
		addToWatchList("stock", watchListID).then((response) => {
			console.log(response);
		});
	};

	if (query) {
		return (
			<div className="stocksContainer">
				<h1>Stocks</h1>
				<CandleStick search={query} />
				<button onClick={(e) => addStockToWatchList(e)}>
					Add Ticker to Watch List
				</button>
			</div>
		);
	} else {
		return (
			<div className="stocksContainer">
				<h1>Stocks</h1>
			</div>
		);
	}
}
