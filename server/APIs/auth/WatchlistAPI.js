const express = require("express");
const router = express.Router();

router.get('/get',(req,res) => {
	req.db.query('CALL getUserwatchlist(?)', req.session.user.userID, (err,results,fields) => {
		if (err) {res.status(500).end(); return};
		res.send(results[0]).end();
	})
})

router.post('/add/:type/:id', (req,res) => {
	const type = req.params.type;
	const identifier = req.params.id;
	req.db.query('CALL addToWatchlist(?,?,?)', [req.session.user.userID, type, identifier],(err,results,fields) => {
		if (err) {res.status(500).end(); return};
		res.status(201).end();
	})
})

router.delete('/delete/:listID', (req,res) => {
	const listID = req.params.listID;
	req.db.query('CALL deleteFromWatchlist(?,?)', [req.session.user.userID, listID],(err,results,fields) => {
		if (err) {res.status(500).end(); return};
		res.end();
	})
})

module.exports = router;