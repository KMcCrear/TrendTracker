const auth = require("basic-auth");
const bcrypt = require('bcrypt');

/**
 * 
 * @param {mysql.Pool} db 
 * @returns 
 */
exports.login = function(db) { 
	return ((req,res) => {
		if (req.session.user) {res.status(400).end('Already logged in'); return}
		const credentials = auth(req);
		if (!credentials) {
			res.status(401).set('WWW-Authenticate', 'Basic realm="Access to user section", charset="UTF-8"').end("Invalid or no credentials provided");
		}
		else {
			db.query('CALL getUser(?)',credentials.name,(err,results,fields) => {
				if (err) {res.status(500).end(); return}
				if (results[0].length == 0) {res.status(401).end('Invalid uername or password'); return}

				let user = results[0][0];

				bcrypt.compare(credentials.pass,user.password).then((result) => {
					if (result) {
						req.session.user = {
							userID: user.userID,
							forename: user.forename,
							surname: user.surname
						}
						res.cookie('user',JSON.stringify({forename: user.forename, surname: user.surname}));
						res.status(200).end('Successfully logged in');
					}
					else {
						res.status(401).end('Invalid username or password');
					}
				});
			});
		}
	})
	
}

exports.logout = function(db) {
	return ((req,res) => {

	})
}