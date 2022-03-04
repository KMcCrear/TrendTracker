import React from "react";
import getCryptoData from "../helpers/getCryptoData";

const getData = async () => {
	const quoteArray = [];
	const cryptoData = await getCryptoData();

	console.log(cryptoData);
	// cryptoData.forEach((entry) => {
	// 	quoteArray.push(entry.quote);
	// });
	// console.log(quoteArray);
};

export default function Crypto() {
	const data = getData;

	return (
		<div className="cryptoContainer">
			<h1>Crypto</h1>
			<button onClick={data}>Get Data</button>
		</div>
	);
}
