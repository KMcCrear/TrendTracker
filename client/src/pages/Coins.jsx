import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import getCoinData from "../helpers/getCoinData";
import TimeSeries from "../components/TimeSeries";
import TweetInfo from "../components/TweetInfo";
import getCoinID from "../helpers/getCoinID";
import { Space } from "antd";

const Coins = () => {
	const { searchParams } = useLocation();
	const [seriesData, setSeriesData] = useState("");
	const [marketData, setMarketData] = useState("");
	const history = useLocation();
	const query = history.pathname;

	useEffect(() => {
		const createTable = (data) => {
			let coinAarry = data.total_volumes;
			let arrayToSend = [];

			coinAarry.forEach((entry) => {
				arrayToSend.push({ x: new Date(entry[0]), y: [entry[1]] });
			});

			setSeriesData(
				<div className="coinsContainer">
					<Space direction="horizontal" style={{ width: "100%" }}>
						<TimeSeries name={query.slice(7)} data={arrayToSend} />
						<TweetInfo search={query.slice(7).toLocaleLowerCase()} />
					</Space>
				</div>
			);
		};

		const getData = async () => {
			const coinData = await getCoinData(query.slice(7).toLowerCase());
			createTable(coinData);
		};

		const getCoinIdFromSearch = async (search) => {
			const idData = await getCoinID(search);
			let marketDataObject = {
				current_price_usd: idData.market_data.current_price.usd,
				market_cap_usd: idData.market_data.market_cap.usd,
				market_cap_change_percentage_24h:
					idData.market_data.market_cap_change_percentage_24h,
				price_change_24h: idData.market_data.price_change_24h,
			};

			setMarketData(marketDataObject);
		};
		getData();
		getCoinIdFromSearch(query.slice(7).toLowerCase());
	}, [query]);

	return (
		<div>
			<h1>Coins Bro</h1>
			<div>{seriesData}</div>
			<ul>
				<li>Current Price $: {marketData.current_price_usd}</li>
				<li>Market Cap $: {marketData.market_cap_usd}</li>
				<li>
					Market Cap Change 24h: {marketData.market_cap_change_percentage_24h}%
				</li>
				<li>Price Change 24h: {marketData.price_change_24h}%</li>
			</ul>
		</div>
	);
};

export default Coins;
