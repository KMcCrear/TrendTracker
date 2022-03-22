const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get('/get',(req,res) => {
	res.end("OK");
})

module.exports = router;