const express = require('express');
const auth = require("basic-auth");
const bcrypt = require("bcrypt");

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
					res.status(401).end("Invalid username or password");
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

	router.post('/logout',(req,res) => {
		if (req.session.user) {
			req.session.destroy((err) => {
				if (err) {
					res.status(500).end();
				}
				else {
					res.status(200).end("Successfully logged out");
				}
			});
		}
		else {
			res.status(400).end("Not logged in");
		}
	})

	router.post('/register/:forename/:surname', (req,res) => {
		const credentials = auth(req);

		if (!credentials) {
			res.status(401)
			.set(
				"WWW-Authenticate",
				'Basic realm="Access to user section", charset="UTF-8"'
			).end("Invalid or no credentials provided");
			return;
		}
		
		const {forename} = req.params;
		const {surname} = req.params;

		bcrypt.hash(credentials.pass,10,(error,hash) => {
			if (error) {
				res.status(500).end();
				return;
			}
			db.query("CALL addUser(?,?,?,?)",[forename,surname,credentials.name,hash],(err,results,fields) => {
				if (err) {
					res.status(500).end();
					return;
				}
				res.status(201).end("Successfully registered")
			})
		});

	})

	return router;
}
