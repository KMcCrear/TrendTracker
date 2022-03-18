const express = require("express");
const axios = require("axios");
const router = express.Router();

/**
 * @name coinsMarket_Chart
 * Searches and returns the latest 10 tweets related to the search term
 */
router.get("/coins/market_chart/:search", (req, res) => {
	const query = req.params.search;
	axios({
		method: "get",
		url: `https://api.coingecko.com/api/v3/coins/${query}/market_chart?vs_currency=usd&days=7&interval=daily`,
	})
		.then((response) => {
			res.send(response.data);
		})
		.catch((err) => {
			console.log(new Date().toString().substring(0, 24) + ": " + err.message);
			res.send(err);
		});
});

module.exports = router;
