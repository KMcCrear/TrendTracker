import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CandleStick from "../components/CandleStick";
import getSingleTicker from "../helpers/getSingleTicker";
import NewsInfo from "../components/NewsInfo";
import getTweets from "../helpers/getTweets";

export default function Stocks(props) {
	const { state } = props;
	const { ticker } = useParams();
	const [stockData, setStockData] = useState("");
	const [tweets, setTweets] = useState([]);

	useEffect(() => {
		const top5 = ["AAPL", "MSFT", "AMZN", "TSLA", "NVDA"];
		if (ticker) {
			const getTweetData = async () => {
				const data = await getTweets(ticker.toUpperCase());
				setTweets(data);
			};
			getTweetData();
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
									<a href={`/stock/${response.symbol}`}>{response.symbol}</a>
								</td>
								<td className="dataPrice">{response.close}</td>
							</tr>
						</tbody>
					</table>
				));
				setStockData(renderData);
			};
		}
	}, [ticker]);

	if (ticker) {
		return (
			<div className="stocksContainer">
				<h1 className="heading">{ticker} Stock Price</h1>
				<CandleStick search={ticker} state={state} what="stock" />
				<div id="newsInfo">
					<NewsInfo search={ticker} />
				</div>
			</div>
		);
	} else {
		return (
			<div className="stocksContainer">
				<h1 className="heading">Trending Stocks</h1>
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

