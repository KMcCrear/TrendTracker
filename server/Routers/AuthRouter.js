const express = require("express");
const router = express.Router();

const mysql = require("mysql");
const mysqlconfig = require("../config/mysqlconfig.json");
const db = mysql.createPool(mysqlconfig);
const session = require("express-session");

router.use(
	session({
		secret: "thisisaverysecretvaluesubjecttochange",
		resave: false,
		saveUninitialized: false,
		name: "sessionid",
		cookie: {
			secure: false,
		},
	})
);

const loginapi = require("../APIs/auth/LoginAPI");

router.post("/login", loginapi.login(db));
router.post("/logout", loginapi.logout(db));

router.use((req, res, next) => {
	if (req.session.user) {
		req.db = db;
		next();
	} else {
		res.status(401).end("Please login before attempting to access");
	}
});

//API imports
const watchlistapi = require("../APIs/auth/WatchlistAPI");

//API uses
router.use("/watchlist", watchlistapi);

module.exports = router;
