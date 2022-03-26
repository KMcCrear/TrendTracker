import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import getFinanceData from "../helpers/getFinanceData";
import CandleStick from "../components/CandleStick";

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

	const addToWatchList = () => {
		//Method will call a helper to pass the userID type: stock and ID:ticker
		console.log(query);
	};

	if (query) {
		return (
			<div className="stocksContainer">
				<h1>Stocks</h1>
				<CandleStick search={query} />
				<button onClick={addToWatchList}>Add Ticker to Watch List</button>
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
