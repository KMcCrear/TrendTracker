const express = require("express");
const axios = require("axios");
const router = express.Router();
const { POLYGONAPITOKEN } = require("../config/tokens/PolygonAPIToken.json");

/**
 * @name SearchTicker
 * Searches and returns the last week of stock data related to the ticker
 */
router.get("/search/ticker/:search", (req, res) => {
	const searchQuery = req.params.search;
	const MAXDATAPOINTS = 30;
	const LIMIT = 10000;

	let rangePast = 86400000; //day in milliseconds, how many milliseconds to query into past
	let rangeResolutionMulti = 1;
	let rangeResolution = 'hour';

	//query processing
	//if object is empty
	if (Object.keys(req.query).length != 0) {
		//range
		if (req.query.range != undefined) {
			let range = req.query.range;
			const ranges = new Map([
				['week',7],
				['month',30],
				['quarter',90],
				['year',360],
				['2year',720]
			]);
			if (ranges.has(range)) {
				const rangeMulti = ranges.get(range);
				rangePast *= rangeMulti;
				rangeResolutionMulti = Math.ceil(rangeMulti/MAXDATAPOINTS);
				rangeResolution = 'day';
			}
		}
	}
	
	const dateNow = new Date().toISOString().substring(0, 10);
	const dateFrom = new Date(new Date() - rangePast).toISOString().substring(0, 10);

	axios({
		method: "get",
		url: `https://api.polygon.io/v2/aggs/ticker/${searchQuery}/range/${rangeResolutionMulti}/${rangeResolution}/${dateFrom}/${dateNow}?&sort=asc&limit=${LIMIT}&apiKey=${POLYGONAPITOKEN}`,
	})
		.then((response) => {
			res.send(response.data.results);
		})
		.catch((err) => {
			console.log(new Date().toString().substring(0, 24) + ": " + err.message);
			res.send(err);
		});
});

/**
 * @name SearchNews
 * Searches and returns 
 */
router.get("/search/news/:search", (req, res) => {
	const query = req.params.search;
	axios({
		method: "get",
		url: `https://api.polygon.io/v2/reference/news?ticker=${query}&apiKey=${POLYGONAPITOKEN}`,
	})
		.then((response) => {
			res.send(response.data.results);
		})
		.catch((err) => {
			console.log(new Date().toString().substring(0, 24) + ": " + err.message);
			res.send(err);
		});
});

module.exports = router;
