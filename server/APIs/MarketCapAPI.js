const express = require("express");
const axios = require("axios");
const router = express.Router();
const {
	MARKETCAPAPITOKEN,
} = require("../config/tokens/MarketCapAPIToken.json");

/**
 * @name SearchLatest
 * Searches and returns the latest trending crypto currencies
 */

router.get("/trending/latest", (req, res) => {
	axios({
		method: "get",
		headers: {
			"X-CMC_PRO_API_KEY": ` ${MARKETCAPAPITOKEN}`,
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
