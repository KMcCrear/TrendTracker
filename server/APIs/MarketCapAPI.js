const express = require("express");
const axios = require("axios");
const router = express.Router();
const {
	MARKET_CAP_API_TOKEN,
} = require("../config/APITokens.json");

/**
 * @name SearchLatest
 * Searches and returns the latest trending crypto currencies
 */

/**
 * For testing use this endpoint - sandbox-api.coinmarketcap.com
 * For Live version use this endpoint - pro-api.coinmarketcap.com
 */

router.get("/trending/latest", (req, res) => {
	axios({
		method: "get",
		headers: {
			"X-CMC_PRO_API_KEY": ` ${MARKET_CAP_API_TOKEN}`,
		},
		credentials: true,
		url: `https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`,
	})
		.then((response) => {
			res.send(response.data.data);
		})
		.catch((err) => {
			console.log(new Date().toString().substring(0, 24) + ": " + err.message);
			res.send(err);
		});
});

module.exports = router;
