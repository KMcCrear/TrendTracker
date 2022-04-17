import React, { useEffect, useState, useRef } from "react";
import deleteFromWatchlist from "../helpers/deleteFromWatchlist";
import getWatchlist from "../helpers/getWatchlist";
export default function Portfolio(props) {
	const { state } = props;
	const [stockData, setStockData] = useState();
	const [cryptoData, setCryptoData] = useState();
	const actualStockData = useRef([]);
	const actualCryptoData = useRef([]);

	const table = (array) => {
		let count = 1;
		return (
			array.map((data) => (
				<tr className={`${data.what}Row`} key={data.identifier}>
					<td>{count++}</td>
					<td className="dataName">
						<a href={`/${data.what}/${data.identifier}`}>{data.identifier}</a>
					</td>
				<td className="dataPrice">{0}</td>
				<td><a onClick={() => remove(data)}>Remove</a></td>
			</tr>
			))
		)
	}

	const remove = (data) => {
		const id = data.identifier;
		deleteFromWatchlist(id).then(() => {
			if (data.what === "stock") {
				actualStockData.current = actualStockData.current.filter(row => row.key != id)
				setStockData(actualStockData.current)
			}
			else {
				actualCryptoData.current = actualCryptoData.current.filter(row => row.key != id)
				setCryptoData(actualCryptoData)
			}
		}).catch((err) => {
			console.log(err);
			alert('Unable');
		})
	}

	useEffect(() => {
		getWatchlist().then((data) => {
			actualStockData.current = table(data.filter(d => d.what === 'stock'));
			actualCryptoData.current = table(data.filter(d => d.what === 'crypto'));
			setStockData(actualStockData.current);
			setCryptoData(actualCryptoData.current);
		});
	}, []);

	if (state.loggedIn) {
		return (
			<div className="portfolioContainer">
				<h1>User Portfolio</h1>

				<table className="stockTable">
					<thead className="columns">
						<tr className="columnData">
							<th>#</th>
							<th>Stock</th>
							<th>Price</th>
						</tr>
					</thead>
					<tbody className="loadedStockData">{stockData}</tbody>
				</table>
				<table className="cryptoTable">
					<thead className="columns">
						<tr className="columnData">
							<th>#</th>
							<th>Coin</th>
							<th>Price</th>
						</tr>
					</thead>
					<tbody className="loadedCryptoData">{cryptoData}</tbody>
				</table>		
			</div>
		);
	}
	return (
		<div className="portfolioContainer">
			<h2>In order to view your portfolio, you must login! <a href="/login">Click here</a></h2>
		</div>
	)
}
