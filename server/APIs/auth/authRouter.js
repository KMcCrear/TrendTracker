const express = require("express");
const router = express.Router();

const session = require('express-session');

router.use(
	session({
		secret: 'thisisaverysecretvaluesubjecttochange',
		resave: false,
		saveUninitialized: false,
		name: 'trendtracker',
		cookie: {
			maxAge: 86400,
			secure: false
		}
	})
)

const loginapi = require('./LoginAPI');
const watchlistapi = require('./WatchlistAPI')

router.use('/login',loginapi);

router.use((req,res,next) => {
    if (req.session.user) {
        next();
    }
    else {
        res.status(401).end();
    }
})

router.use('/watchlist',watchlistapi)

module.exports = router;