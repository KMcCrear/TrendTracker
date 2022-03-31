const express = require('express');
const auth = require("basic-auth");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

module.exports = function(database) {
	const router = express.Router();
	const db = database;

	router.post('/login',(req, res) => {
		if (req.session.user) {
			res.status(400).end("Already logged in");
			return;
		}
		const credentials = auth(req);
		if (!credentials) {
			res.status(401)
			.set(
				"WWW-Authenticate",
				'Basic realm="Access to user section", charset="UTF-8"'
			).end("Invalid or no credentials provided");
		}
		else {
			db.query("CALL getUser(?)", credentials.name, (err, results, fields) => {
				if (err) {
					res.status(500).end();
					return;
				}
				if (results[0].length == 0) {
					res.status(401).end("Invalid uername or password");
					return;
				}

				const user = results[0][0];

				bcrypt.compare(credentials.pass, user.password).then((result) => {
					if (result) {
						req.session.user = {
							userID: user.userID,
							forename: user.forename,
							surname: user.surname,
						};
						res
							.status(200)
							.cookie('state',JSON.stringify({ loggedIn: true, forename: user.forename, surname: user.surname }))
							.end("Successfully logged in");
					} else {
						res.status(401).end("Invalid username or password");
					}
				});
			});
		}
	});

	router.get('/login',(req,res) => {
		if (req.session.user) {
			const user = req.session.user;
			res
			.status(200)
			.cookie('state',{ loggedIn: true, forename: user.forename, surname: user.surname })
			.end();
		}
		else {
			res.status(200).end();
		}
	})


	return router;
}
