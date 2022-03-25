const express = require("express");
const axios = require("axios");
const mysql = require("mysql");
const e = require("express");
const router = express.Router();

/**
 *
 * @param {mysql.Pool} db
 * @returns
 */

router.post("/getUserWatchlist", (req, res, db) => {
	if (!req.session.user) {
		res
			.status(401)
			.set("WWW-Authenticate", 'Basic realm="Login to Access", charset="UTF-8"')
			.end();
	} else {
		db.query(
			`CALL getUserwatchlist('${req.session.user.id}')`,
			(err, result) => {
				if (err) {
					res.send({ message: err });
					console.log(err);
				} else {
					console.log("userWatchList successfully loaded");
					res.send(result);
				}
			}
		);
	}
});

module.exports = router;
