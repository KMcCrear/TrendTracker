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
			secure: false
		}
	})
)

const loginapi = require('../APIs/auth/LoginAPI');

router.post('/login',loginapi.login);
router.post('/logout',loginapi.logout)

router.use((req,res,next) => {
    if (req.session.user) {
        next();
    }
    else {
        res.status(401).end('Please login before attempting to access');
    }
})

//API imports
const watchlistapi = require('../APIs/auth/WatchlistAPI')

//API uses
router.use('/watchlist',watchlistapi)

module.exports = router;