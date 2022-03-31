const express = require("express");
const router = express.Router();

router.get("/getUserWatchList", (req, res) => {
	req.db.query(
		"CALL getUserwatchlist(?)",
		req.session.user.userID,
		(err, results, fields) => {
			if (err) {
				res.status(500).end();
				return;
			}
			res.send(results[0]).end();
		}
	);
});

router.get('/has/:identifier',(req,res) => {
	const identifier = req.params.identifier;
	req.db.query('CALL getUserwatchlistItem(?,?)', [req.session.user.userID, identifier],(err,results,fields) => {
		if (err) {res.status(500).end(); return};
		if (results[0].length == 0) {
			res.status(200).end('false');
		}
		else {
			res.status(200).end('true');
		}
	})
})

router.post("/add/:type/:identifier", (req, res) => {
	const type = req.params.type;
	const identifier = req.params.identifier;
	req.db.query('CALL addToWatchlist(?,?,?)', [req.session.user.userID, type, identifier],(err,results,fields) => {
		if (err) {res.status(500).end(); return};
		res.status(201).end();
	})
})

router.delete('/delete/:identifier', (req,res) => {
	const identifier = req.params.identifier;
	req.db.query('CALL deleteFromWatchlist(?,?)', [req.session.user.userID, identifier],(err,results,fields) => {
		if (err) {res.status(500).end(); return};
		res.end();
	})
})

module.exports = router;
