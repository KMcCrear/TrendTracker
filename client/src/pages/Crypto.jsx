import React, { useEffect, useState } from "react";
import getCryptoData from "../helpers/getCryptoData";
import { useLocation, useParams } from "react-router-dom";
import TimeSeries from "../components/TimeSeries";
import TweetInfo from "../components/TweetInfo";
import addToWatchList from "../helpers/addToWatchlist";
import getCoinData from "../helpers/getCoinData";
import { Space } from "antd";

export default function Crypto(props) {
	const [cryptoData, setCryptoData] = useState("");
	const [graphData, setGraphData] = useState("");

	const { state } = props;
	const { coin } = useParams();

	useEffect(() => {
		const getTop12Coins = async () => {
			const cryptoData = await getCryptoData();
			renderData(cryptoData.slice(0, 12));
		};

		const getSingleCoinData = async () => {
			setGraphData(
				<Space direction="horizontal" style={{ width: "100%" }}>
					<TimeSeries search={coin} state={state} what="crypto" />
					<TweetInfo search={coin.toLocaleLowerCase()} />
				</Space>
			);
		};
		if (coin) {
			getSingleCoinData();
		} else {
			getTop12Coins();
		}
	}, [coin]);

	const renderData = (cryptoArray) => {
		let count = 0;
		let renderedCrypto = cryptoArray.map((data) => (
			<table className="cryptoTable" key={data.name}>
				<tbody className="loadedCryptoData">
					<tr className="cryptoData">
						<td>{(count += 1)}</td>
						<td className="dataName">
							<a href={`/crypto/${data.name}`}>{data.name}</a>
						</td>
						<td className="dataPrice">{data.quote.USD.price}</td>
						<td>{Math.round(data.quote.USD.percent_change_1h * 100) / 100}</td>
						<td>{Math.round(data.quote.USD.percent_change_24h * 100) / 100}</td>
						<td>{Math.round(data.quote.USD.percent_change_7d * 100) / 100}</td>
						<td className="dataVolume">${data.quote.USD.volume_24h}</td>
						<td className="dataMktCap">{data.quote.USD.market_cap}</td>
					</tr>
				</tbody>
			</table>
		));
		setCryptoData(renderedCrypto);
	};

	if (coin) {
		return (
			<div>
				<h1>{coin}</h1>
				<div>{graphData}</div>
			</div>
		);
	} else {
		return (
			<div className="cryptoContainer">
				<h1 className="title">Crypto Prices by Market Cap</h1>
				<table className="headerTable">
					<thead className="columns">
						<tr className="columnData">
							<th>#</th>
							<th>Coin</th>
							<th>Price</th>
							<th>1h</th>
							<th>24h</th>
							<th>7d</th>
							<th>24h Volume</th>
							<th>Mkt Cap</th>
						</tr>
					</thead>
				</table>
				{cryptoData}
			</div>
		);
	}
}
