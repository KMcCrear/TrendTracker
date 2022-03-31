const express = require("express");
const axios = require("axios");
const router = express.Router();
const { POLYGON_API_TOKEN } = require("../config/APITokens.json");

const MAXDATAPOINTS = 30;
const LIMIT = 5000;

/**
 * @name SearchTicker
 * Searches and returns the last week of stock data related to the ticker, up to a maximum of 30 data points
 */
router.get("/search/ticker/:search", (req, res) => {
	const searchQuery = req.params.search;

	let rangePast = 0; //days to look into past
	let rangeResolutionMulti = 1;
	let rangeResolution = "hour";

	//query processing
	//if object is empty
	if (Object.keys(req.query).length != 0) {
		//range
		if (req.query.range != undefined) {
			let range = req.query.range;
			let valid = true;
			let dayRange;
			switch (range) {
				case "week":
					dayRange = 7;
					break;
				case "month":
					dayRange = 30;
					break;
				case "quarter":
					dayRange = 90;
					break;
				case "year":
					dayRange = 360;
					break;
				case "2year":
					dayRange = 720;
					break;
				default:
					valid = false;
					break;
			}
			if (valid) {
				rangePast = dayRange;
				rangeResolutionMulti = Math.ceil(dayRange / MAXDATAPOINTS);
				rangeResolution = "day";
			}
		}
	}

	const date = new Date();
	date.setDate(date.getDate() - 1);
	//from start of day from to end of yesterday, therefor if range = day dates are the same
	//as we can only query data once the day is done, la is chosen as end of day to polygon is end of a day in usa
	const dateYesterdayLocale = date.toLocaleString("sv", {
		timeZone: "America/Los_Angeles",
		dateStyle: "short",
	});
	let dateFromLocale;
	if (rangePast > 0) {
		date.setDate(date.getDate() - rangePast);
		dateFromLocale = date.toLocaleString("sv", {
			timeZone: "America/Los_Angeles",
			dateStyle: "short",
		});
	} else {
		dateFromLocale = dateYesterdayLocale;
	}

	axios({
		method: "get",
		url: `https://api.polygon.io/v2/aggs/ticker/${searchQuery}/range/${rangeResolutionMulti}/${rangeResolution}/${dateFromLocale}/${dateYesterdayLocale}?&sort=asc&limit=${LIMIT}&apiKey=${POLYGON_API_TOKEN}`,
	})
		.then((response) => {
			if (response.data.results == undefined) {
				res.send([]);
			} else {
				res.send(response.data.results);
			}
		})
		.catch((err) => {
			console.log(new Date().toString().substring(0, 24) + ": " + err.message);
			res.send(err);
		});
});

/**
 * @name SearchNews
 * Searches and returns up to 10 news items related to provided ticker
 */
router.get("/search/news/:search", (req, res) => {
	const query = req.params.search;
	axios({
		method: "get",
		url: `https://api.polygon.io/v2/reference/news?ticker=${query}&limit=10&apiKey=${POLYGON_API_TOKEN}`,
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
 * @name SearchCompany
 * Searches and returns up to 10 companies related to search query
 * @see https://polygon.io/docs/stocks/get_v3_reference_tickers
 */
router.get("/search/company/:search", (req, res) => {
	const searchQuery = req.params.search;
	axios({
		method: "get",
		url: `https://api.polygon.io/v3/reference/tickers?market=stocks&search=${searchQuery}&limit=10&apiKey=${POLYGON_API_TOKEN}`,
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
 * @name SearchSingleTicker
 * Searches and returns up to 10 news items related to provided ticker
 */

router.get("/search/singleticker/:search", (req, res) => {
	const date = new Date();
	date.setDate(date.getDate() - 1);
	//from start of day from to end of yesterday, therefor if range = day dates are the same
	//as we can only query data once the day is done, la is chosen as end of day to polygon is end of a day in usa
	const dateYesterdayLocale = date.toLocaleString("sv", {
		timeZone: "America/Los_Angeles",
		dateStyle: "short",
	});
	const query = req.params.search;
	axios({
		method: "get",
		url: `https://api.polygon.io/v1/open-close/${query}/${dateYesterdayLocale}?adjusted=true&apiKey=${POLYGON_API_TOKEN}`,
	})
		.then((response) => {
			res.send(response.data);
		})
		.catch((err) => {
			console.log(new Date().toString().substring(0, 24) + ": " + err);
			res.send(err);
		});
});

module.exports = router;
