import React, { useEffect, useState } from "react";
import getCryptoData from "../helpers/getCryptoData";

export default function Crypto() {
	const [cryptoData, setCryptoData] = useState("");

	useEffect(() => {
		const getData = async () => {
			let anArray = [];
			const cryptoData = await getCryptoData();
			renderData(cryptoData.slice(0, 12));
		};
		getData();
	}, []);

	const renderData = (cryptoArray) => {
		let count = 0;
		let renderedCrypto = cryptoArray.map((data) => (
			<table className="cryptoTable" key={data.name}>
				<tbody className="loadedCryptoData">
					<tr className="cryptoData">
						<td>{(count += 1)}</td>
						<td className="dataName">{data.name}</td>
						<td className="dataPrice">{data.quote.USD.price}</td>
						<td className="dataVolume">{data.quote.USD.volume_24h}</td>
						<td className="dataMktCap">{data.quote.USD.market_cap}</td>
					</tr>
				</tbody>
			</table>
		));
		setCryptoData(renderedCrypto);
	};

	return (
		<div className="cryptoContainer">
			<h1 className="title">Crypto</h1>
			<table className="headerTable">
				<thead className="columns">
					<tr className="columnData">
						<th>#</th>
						<th>Coin</th>
						<th>Price</th>
						<th>24h Volume</th>
						<th>Mkt Cap</th>
					</tr>
				</thead>
			</table>
			{cryptoData}
		</div>
	);
}
