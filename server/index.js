const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { response } = require("express");

const serverPort = 3001;

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
		origin: ["http://localhost:3000"],
		methods: ["GET", "POST", "PUT"],
		credentials: true,
	})
);

const twitterAuthStr = "Bearer ".concat(
	"AAAAAAAAAAAAAAAAAAAAAGDHZQEAAAAAzS3up1pR%2FBgry2LrRkzMK2wdT%2Fc%3D8RadadxvFKJORwgrFuHkg1QaZCHDvBNmnraExeaHzU7vuTZBAj"
); // this will be used to pass the token

function getTwitterData(twitterQuery) {
	axios
		.get(
			`https://api.twitter.com/2/tweets/search/recent?query=${twitterQuery}`,
			{ headers: { Authorization: twitterAuthStr } }
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

// const financeAuthStr = "xE4Iupvyfl2kQuJi2taQK9kAauYFC9ni3mgKiboz"; // this will be used to pass the token

function getFinanceData(userQuery) {
	const financeAuthStr = "xE4Iupvyfl2kQuJi2taQK9kAauYFC9ni3mgKiboz"; // this will be used to pass the token
	return axios
		.get(
			`https://yfapi.net/v8/finance/chart/${userQuery}?range=1mo&region=US&interval=1d&lang=en&events=div%2Csplit`,
			{ headers: { "X-API-KEY": financeAuthStr } }
		)
		.then((response) => response.data);
}

app.post("/data", (req, res) => {
	userQuery = req.body.userQuery;
	getFinanceData(userQuery).then((response) => {
		let timeStamp = response.chart.result[0].timestamp;
		let high = response.chart.result[0].indicators.quote[0].high;
		let low = response.chart.result[0].indicators.quote[0].low;
		let close = response.chart.result[0].indicators.quote[0].close;
		let open = response.chart.result[0].indicators.quote[0].open;

		const financeData = {
			timeStamp: timeStamp,
			high: high,
			low: low,
			close: close,
			open: open,
		};
		res.send(financeData);
	});
});

app.listen(serverPort, () => {
	console.log(`Server Running on Port ${serverPort}`);
});
