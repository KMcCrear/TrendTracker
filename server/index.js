const express = require("express");
const cors = require("cors");
const axios = require("axios");

const {HOST,PORT} = require("./config/host.json");

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


function getTwitterData(twitterQuery) {
	axios
		.get(
			`https://api.twitter.com/2/tweets/search/recent?query=${twitterQuery}`,
			{ headers: { Authorization: twitterapi } }
		)
		.then(
			(response) => {
				console.log(response.data);
			},
			(error) => {
				console.log(error);
			}
		);
}

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
});

//Functions relating to Polygon API
app.post("/polydata", (req, res) => {
	userQuery = req.body.userQuery;
	getPolygonData(userQuery).then((response) => {
		res.send(response);
	});
});

function getPolygonData(userQuery) {
	return axios
		.get(
			`https://api.polygon.io/v2/aggs/ticker/${userQuery}/range/1/day/2022-02-02/2022-02-22?adjusted=true&sort=asc&limit=120&apiKey=YOUR_API_KEY`
		)
		.then((response) => response.data);
}


//API imports
const twitterapi = require('./APIs/TwitterAPI');

//API uses
app.use('/twitter',twitterapi);

app.listen(PORT, () => {
	console.log(`Server Running on Port ${PORT}`);
});
