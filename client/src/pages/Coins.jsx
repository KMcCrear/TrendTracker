import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import getCoinData from "../helpers/getCoinData";
import TimeSeries from "../components/TimeSeries";
import TweetInfo from "../components/TweetInfo";
import addToWatchList from "../helpers/addToWatchList";
import { Space } from "antd";

const Coins = () => {
	const { searchParams } = useLocation();
	const [seriesData, setSeriesData] = useState("");
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
				<Space direction="horizontal" style={{ width: "100%" }}>
					<TimeSeries name={query.slice(7)} data={arrayToSend} />
					<TweetInfo search={query.slice(7).toLocaleLowerCase()} />
				</Space>
			);
		};

		const getData = async () => {
			const coinData = await getCoinData(query.slice(7).toLowerCase());
			createTable(coinData);
		};
		getData();
	}, [query]);

	const addCoinToWatchList = (e) => {
		e.preventDefault();
		const watchListID = query.slice(7).toLowerCase().trim();
		addToWatchList("crypto", watchListID).then((response) => {
			console.log(response);
		});
	};

	return (
		<div>
			<h1>Coins Bro</h1>
			<div>{seriesData}</div>
			<button onClick={(e) => addCoinToWatchList(e)}>
				Add to your Watchlist
			</button>
		</div>
	);
};

export default Coins;
