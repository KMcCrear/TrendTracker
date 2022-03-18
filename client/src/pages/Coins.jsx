import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import getCoinData from "../helpers/getCoinData";
import TimeSeries from "../components/TimeSeries";

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

			setSeriesData(<TimeSeries name={query.slice(7)} data={arrayToSend} />);
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
