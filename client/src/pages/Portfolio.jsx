import React, { useEffect, useState } from "react";
import getWatchlist from "../helpers/getWatchlist";
import { Space } from "antd";
export default function Portfolio(props) {
	const { state } = props;
	const [stockData, setStockData] = useState();
	const [cryptoData, setCryptoData] = useState();

	useEffect(() => {
		getWatchlist().then((data) => {
			let count = 0;
			console.log(data);
			let stockArray = [];
			let cryptoArray = [];

			data.forEach((entry) => {
				if (entry.what === "stock") {
					stockArray.push(entry.identifier);
				} else {
					cryptoArray.push(entry.identifier);
				}
			});

			let renderStockData = stockArray.map((data) => (
				<table className="stockTable" key={data}>
					<tbody className="loadedStockData">
						<tr className="stockData">
							<td>{(count += 1)}</td>
							<td className="dataName">
								<a href={`/stock/${data}`}>{data}</a>
							</td>
							<td className="dataPrice">{0}</td>
						</tr>
					</tbody>
				</table>
			));
			setStockData(renderStockData);

			let renderCryptoData = cryptoArray.map((data) => (
				<table className="cryptoTable" key={data}>
					<tbody className="loadedCryptokData">
						<tr className="cryptoData">
							<td>{(count += 1)}</td>
							<td className="dataName">
								<a href={`/coins/${data}`}>{data}</a>
							</td>
							<td className="dataPrice">{0}</td>
						</tr>
					</tbody>
				</table>
			));
			setCryptoData(renderCryptoData);
		});
	}, []);

	return (
		<div className="portfolioContainer">
			<h1>User Portfolio</h1>

			<table className="headerStockTable">
				<thead className="columns">
					<tr className="columnData">
						<th>#</th>
						<th>Stock</th>
						<th>Price</th>
					</tr>
				</thead>
			</table>
			{stockData}
			<table className="headerCryptoTable">
				<thead className="columns">
					<tr className="columnData">
						<th>#</th>
						<th>Coin</th>
						<th>Price</th>
					</tr>
				</thead>
			</table>
			{cryptoData}
		</div>
	);
}
