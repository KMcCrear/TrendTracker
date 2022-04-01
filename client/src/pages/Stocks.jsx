
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import getFinanceData from "../helpers/getFinanceData";
import CandleStick from "../components/CandleStick";
import addToWatchList from "../helpers/addToWatchlist";
import getSingleTicker from "../helpers/getSingleTicker";

export default function Stocks(props) {
	const history = useLocation();
	const params = history.pathname;
	const query = params.slice(8);
	const [stockData, setStockData] = useState("");

	useEffect(() => {
		const top5 = ["AAPL", "MSFT", "AMZN", "TSLA", "NVDA"];
		if (query) {
			getFinanceData(query).then((data) => {
				console.log(data);
			});
		} else {
			let anArray = [];
			top5.forEach((entry) => {
				getSingleTicker(entry).then((response) => {
					anArray.push(response);
					mapData(anArray);
				});
			});
			console.log(anArray);
			const mapData = (stockArray) => {
				let count = 0;
				let renderData = stockArray.map((response) => (
					<table className="stockTable" key={response.symbol}>
						<tbody className="loadedStocksData">
							<tr className="stocksData">
								<td>{(count += 1)}</td>
								<td className="dataName">
									<a href={`/stocks/${response.symbol}`}>{response.symbol}</a>
								</td>
								<td className="dataPrice">{response.close}</td>
							</tr>
						</tbody>
					</table>
				));
				setStockData(renderData);
			};
		}
	}, [query]);

	const addStockToWatchList = (e) => {
		e.preventDefault();
		const watchListID = query.toLowerCase().trim();
		addToWatchList("stock", watchListID).then((response) => {
			console.log(response);
		});
	};

	const {state} = props;
	const {ticker} = useParams();

	if (ticker) {
		return (
			<div className="stocksContainer">
				<h1>Stocks</h1>
				<CandleStick search={ticker} state={state} what="stock"/>
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
						</tr>
					</thead>
				</table>
				{stockData}
			</div>
		);
	}
}
