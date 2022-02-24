const express = require('express');
const axios = require("axios");
const router = express.Router();
const {POLYGONAPITOKEN} = require('../config/tokens/PolygonAPIToken.json');

/**
 * @name SearchTicker
 * Searches and returns the last week of stock data related to the ticker
 */
router.get('/search/ticker/:search',(req,res) => {
    const query = req.params.search;
    const dateNow = new Date().toISOString().substring(0,10);
    //604800000 a week in milliseconds
    const dateFrom = new Date(new Date()-604800000).toISOString().substring(0,10);
    axios({
        method: "get",
        url: `https://api.polygon.io/v2/aggs/ticker/${query}/range/1/day/${dateFrom}/${dateNow}?adjusted=true&sort=asc&limit=120&apiKey=${POLYGONAPITOKEN}`
    }).then((response) => {
        res.send(response.data.results);
    }).catch((err) => {
        console.log(new Date().toString().substring(0,24) + ': ' + err.message);
        res.send(err);
    });
});

module.exports = router;