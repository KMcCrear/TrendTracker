const express = require("express");
const router = express.Router();

const auth = require("basic-auth");

router.post('/',(req,res) => {
	const credentials = auth(req);
	if (!credentials) {
		res.status(401).end('Incorrect credentials');
	}
	else {
		req.session.user = 'hi';
		res.end();
	}	
})

module.exports = router;