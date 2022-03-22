const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { HOST, PORT } = require("./config/host.json");

const app = express();

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Request-With, Content-Type, Accept"
	);
	next();
});

app.use(express.json());

app.use(
	cors({
		origin: [`${HOST}:${PORT}`],
		methods: ["GET", "POST", "PUT"],
		credentials: true,
	})
);

/*
// This function is for yahoofinance API
// function getFinanceData(userQuery) {
// 	const financeAuthStr = "xE4Iupvyfl2kQuJi2taQK9kAauYFC9ni3mgKiboz"; // this will be used to pass the token
// 	return axios
// 		.get(
// 			`https://yfapi.net/v8/finance/chart/${userQuery}?range=1mo&region=US&interval=1d&lang=en&events=div%2Csplit`,
// 			{ headers: { "X-API-KEY": financeAuthStr } }
// 		)
// 		.then((response) => response.data);
// }

app.post("/data", (req, res) => {
	userQuery = req.body.userQuery;
	getFinanceData(userQuery).then((response) => {
		let timeStamp = response.chart.result[0].timestamp;
		let high = response.chart.result[0].indicators.quote[0].high;
		let low = response.chart.result[0].indicators.quote[0].low;
		let close = response.chart.result[0].indicators.quote[0].close;
		let open = response.chart.result[0].indicators.quote[0].open;

		const financeData = [
			{
				timeStamp: timeStamp,
				high: high,
				low: low,
				close: close,
				open: open,
			},
		];
		// const financeData = [timeStamp, high, low, close, open];
		res.send(financeData);
	});
});*/

//API imports
const twitterapi = require("./APIs/TwitterAPI");
const polygonapi = require("./APIs/PolygonAPI");
const marketcapapi = require("./APIs/MarketCapAPI");
const openAiApi = require("./APIs/OpenAIAPI");
const coingeckoapi = require("./APIs/CoinGeckoAPI");

//API uses
app.use("/twitter", twitterapi);
app.use("/polygon", polygonapi);
app.use("/marketcap", marketcapapi);
app.use("/openai", openAiApi);
app.use("/coingecko", coingeckoapi);

app.listen(PORT, () => {
	console.log(`Server Running on Port ${PORT}`);
});
