const express = require('express');
const axios = require("axios");
const router = express.Router();
const {TWITTERAPITOKEN} = require('../config/tokens/TwitterAPIToken.json');

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

/*
      
curl "https://api.twitter.com/2/tweets/search/recent?query=bitcoin" -H "Authorization: AAAAAAAAAAAAAAAAAAAAAGDHZQEAAAAAzS3up1pR%2FBgry2LrRkzMK2wdT%2Fc%3D8RadadxvFKJORwgrFuHkg1QaZCHDvBNmnraExeaHzU7vuTZBAj"

    
*/

module.exports = router;