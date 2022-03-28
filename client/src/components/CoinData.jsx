import React, { useEffect } from "react";
import getCoinData from "../helpers/getCoinData";
import getCoinID from "../helpers/getCoinID";

const CoinData = async () => {
	useEffect(() => {
		const getCoinData = async () => {
			const coinData = await getCoinID();
			console.log(coinData);
		};
		getCoinData();
	});

	return <div>This is where the coin data will be </div>;
};

export default CoinData;
