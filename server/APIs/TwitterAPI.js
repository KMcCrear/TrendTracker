const express = require('express');
const axios = require("axios");
const router = express.Router();
const {TWITTERAPITOKEN} = require('../config/tokens/TwitterAPIToken.json');

/**
 * Searches and returns the latest 10 tweets related to the search term
 */
router.get('/search/:search',(req,res) => {
    const query = req.params.search;
    axios({
        method: "get",
        headers: {
            Authorization: `Bearer ${TWITTERAPITOKEN}`,
        },
        credentials: true,
        url: `https://api.twitter.com/2/tweets/search/recent?query=${query}`,
    }).then((response) => {
        res.send(response.data.data);
    }).catch((err) => {
        console.log('uh oh')
    });
});

module.exports = router;
