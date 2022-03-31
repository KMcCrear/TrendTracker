import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import getFinanceData from "../helpers/getFinanceData";
import CandleStick from "../components/CandleStick";
import addToWatchList from "../helpers/addToWatchlist";

export default function Stocks() {
	const history = useLocation();
	const params = history.pathname;
	const query = params.slice(8);
	const [stockData, setStockData] = useState("");

	useEffect(() => {
		let count = 0;
		const top12 = [
			"AAPL",
			"MSFT",
			"AMZN",
			"TSLA",
			"NVDA",
			"GOOG",
			"GOOGL",
			"FB",
			"AVGO",
			"COST",
			"PEP",
			"CSCO",
		];
		if (query) {
			getFinanceData(query).then((data) => {
				console.log(data);
			});
		} else {
			top12.forEach((entry) => {
				getFinanceData(entry).then((test) => {
					console.log(test);
					let displayTable = test.map((data) => (
						<table className="stockTable" key={data.name}>
							<tbody className="stocksData">
								<tr className="stocksData">
									<td>{(count += 1)}</td>
									<td className="dataName">
										<a href={`/stocks/${data.name}`}>{data.name}</a>
									</td>
									<td className="dataPrice">{data.quote.USD.price}</td>
									<td>
										{Math.round(data.quote.USD.percent_change_1h * 100) / 100}
									</td>
									<td>
										{Math.round(data.quote.USD.percent_change_24h * 100) / 100}
									</td>
									<td>
										{Math.round(data.quote.USD.percent_change_7d * 100) / 100}
									</td>
									<td className="dataVolume">${data.quote.USD.volume_24h}</td>
									<td className="dataMktCap">{data.quote.USD.market_cap}</td>
								</tr>
							</tbody>
						</table>
					));
					setStockData(displayTable);
				});
			});
		}
	}, [query]);

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
				<table className="headerTable">
					<thead className="columns">
						<tr className="columnData">
							<th>#</th>
							<th>Stock</th>
							<th>Price</th>
							<th>1h</th>
							<th>24h</th>
							<th>7d</th>
							<th>24h Volume</th>
							<th>Mkt Cap</th>
						</tr>
					</thead>
				</table>
				{stockData}
			</div>
		);
	}
}
