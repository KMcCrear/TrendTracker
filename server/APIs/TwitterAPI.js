const express = require('express');
const axios = require("axios");
const router = express.Router();
const {TWITTER_API_TOKEN} = require('../config/APITokens.json');

/**
 * @name SearchRecent
 * Searches and returns the latest 10 tweets related to the search term
 */
router.get('/search/recent/:search',(req,res) => {
    const query = req.params.search;
    axios({
        method: "get",
        headers: {
            Authorization: `Bearer ${TWITTER_API_TOKEN}`,
        },
        credentials: true,
        url: `https://api.twitter.com/2/tweets/search/recent?query=${query}`,
    }).then((response) => {
        res.send(response.data.data);
    }).catch((err) => {
        console.log(new Date().toString().substring(0,24) + ': ' + err.message);
        res.send(err);
    });
});

module.exports = router;
