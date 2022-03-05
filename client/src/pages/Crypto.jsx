import React, { useEffect, useState } from "react";
import getCryptoData from "../helpers/getCryptoData";

export default function Crypto() {
	const [cryptoData, setCryptoData] = useState("");

	useEffect(() => {
		const getData = async () => {
			let anArray = [];
			const cryptoData = await getCryptoData();
			renderData(cryptoData.slice(0, 5));
		};
		getData();
	}, []);

	const renderData = (cryptoArray) => {
		let renderedCrypto = cryptoArray.map((data) => (
			<div className="loadedCryptoData" key={data.name}>
				<div className="cryptoData">
					Name: {data.name} <br />
					Price: {data.quote.USD.price}
				</div>
			</div>
		));
		setCryptoData(renderedCrypto);
	};

	return (
		<div className="cryptoContainer">
			<h1>Crypto</h1>
			{cryptoData}
		</div>
	);
}


	return (
		<div className="cryptoContainer">
			<h1>Crypto</h1>
			{cryptoData}
		</div>
	);
}
