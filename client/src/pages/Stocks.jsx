import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import getFinanceData from "../helpers/getFinanceData";
import CandleStick from "../components/CandleStick";
import addToWatchList from "../helpers/addToWatchlist";
import getSingleTicker from "../helpers/getSingleTicker";
import NewsInfo from "../components/NewsInfo";
import getTweets from "../helpers/getTweets";

export default function Stocks(props) {
	const history = useLocation();
	const params = history.pathname;
	const { state } = props;
	const { ticker } = useParams();
	const [stockData, setStockData] = useState("");
	const [tweets, setTweets] = useState([]);
	const [random, setRandom] = useState();

	useEffect(() => {
		const top5 = ["AAPL", "MSFT", "AMZN", "TSLA", "NVDA"];
		let randomItem = top5[Math.floor(Math.random() * top5.length)];
		setRandom(randomItem);
		if (ticker) {
			getFinanceData(ticker).then((data) => {
				console.log(data);
			});
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
			const getTweetData = async () => {
				const data = await getTweets(random.toUpperCase());
				setTweets(data);
			};
			getTweetData();
		}
	}, [ticker]);

	if (ticker) {
		return (
			<div className="stocksContainer">
				<h1 className="heading">{ticker} Stock Price</h1>
				<CandleStick search={ticker} state={state} what="stock" />
				<div
					id="sampleTweets"
					style={{
						display: "inline-block",
						"border-style": "solid",
						"border-radius": "20px",
						"margin-left": "5px",
						"background-color": "#6399B8",
					}}
				>
					<h3>Sample tweets about {ticker}</h3>

					{tweets.data &&
						tweets.data.slice(0, 5).map((tweet) => <p>{tweet.text}</p>)}
				</div>
				<div id="newsInfo">
					<NewsInfo tweets={tweets} search={ticker} />
				</div>
			</div>
		);
	} else {
		return (
			<div className="stocksContainer">
				<h1 className="heading">Trending Stocks</h1>
				<div
					id="sampleTweets"
					style={{
						display: "inline-block",
						"align-content": "right",
						float: "right",
						"border-style": "solid",
						"border-radius": "20px",
						"margin-left": "5px",
						"background-color": "#6399B8",
					}}
				>
					<h3>Sample tweets about {random}</h3>

					{tweets.data &&
						tweets.data.slice(0, 5).map((tweet) => <p>{tweet.text}</p>)}
				</div>
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
