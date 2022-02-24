const express = require('express');
const axios = require("axios");
const router = express.Router();
const {POLYGONAPITOKEN} = require('../config/tokens/PolygonAPIToken.json');

router.get('/search/ticker/:search',(req,res) => {
    const query = req.params.search;
    
});

module.exports = router;