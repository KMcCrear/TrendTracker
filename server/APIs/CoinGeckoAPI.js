const express = require("express");
const axios = require("axios");
const router = express.Router();

/**
 * @name coinsMarket_Chart
 * Searches and returns the latest 10 tweets related to the search term
 */
router.get("/coins/market_chart/:search", (req, res) => {
	const query = req.params.search;
	let rangePast = 1

	//query processing
	//if object is empty
	if (Object.keys(req.query).length != 0) {
		//range
		if (req.query.range != undefined) {
			let range = req.query.range;
			switch (range) {
				case "week":
					rangePast = 7;
					break;
				case "month":
					rangePast = 30;
					break;
				case "quarter":
					rangePast = 90;
					break;
				case "year":
					rangePast = 360;
					break;
				case "2year":
					rangePast = 720;
					break;
			}
		}
	}

	axios({
		method: "get",
		url: `https://api.coingecko.com/api/v3/coins/${query}/market_chart?vs_currency=usd&days=${rangePast}`,
	})
		.then((response) => {
			res.send(response.data);
		})
		.catch((err) => {
			console.log(new Date().toString().substring(0, 24) + ": " + err.message);
			res.send(err);
		});
});

router.get("/coins/id/:search", (req, res) => {
	const query = req.params.search;
	axios({
		method: "get",
		url: `https://api.coingecko.com/api/v3/coins/${query}?localization=false&tickers=true&market_data=true`,
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
