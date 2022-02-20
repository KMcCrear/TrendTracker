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

//for testing purposes
function getTwitterData(twitterQuery) {
	axios({
		method: "get",
		headers: {
			Authorization: `${YOUR_AUTH_KEY}`,
		},
		credentials: true,
		url: `https://api.twitter.com/2/tweets/search/recent?query=${twitterQuery}`,
	}).then(function (response) {
		console.log(response.data);
	});
}

getTwitterData("bitcoin");

app.listen(serverPort, () => {
	console.log(`Server Running on Port ${serverPort}`);
});
