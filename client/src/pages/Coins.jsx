import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import getCoinData from "../helpers/getCoinData";
import TimeSeries from "../components/TimeSeries";
import TweetInfo from "../components/TweetInfo";
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

	return (
		<div>
			<h1>Coins Bro</h1>
			<div>{seriesData}</div>
		</div>
	);
};

export default Coins;
