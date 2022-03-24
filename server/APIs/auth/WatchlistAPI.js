const express = require("express");
const router = express.Router();

router.get('/get',(req,res) => {
	req.db.query(`CALL getUserwatchlist(${req.session.user.userID})`, (err,results,fields) => {
		if (err) {res.status(500).end(); return};
		res.send(results[0]).end();
	})
})

module.exports = router;