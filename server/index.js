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

//API imports
const twitterapi = require('./APIs/TwitterAPI');

//API uses
app.use('/twitter',twitterapi);

app.listen(PORT, () => {
	console.log(`Server Running on Port ${PORT}`);
});
