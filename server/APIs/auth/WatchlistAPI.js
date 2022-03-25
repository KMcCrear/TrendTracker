const express = require("express");
const router = express.Router();

router.get("/get", (req, res) => {
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

router.post("/add/:type/:id", (req, res) => {
	const type = req.params.type;
	const id = req.params.id;
	req.db.query(
		"CALL addToWatchlist(?,?,?)",
		req.session.user.userID,
		type,
		id,
		(err, results, fields) => {
			if (err) {
				res.status(500).end();
				return;
			}
		}
	);
});

module.exports = router;
