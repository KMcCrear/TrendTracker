const auth = require("basic-auth");

exports.login = ((req,res) => {
	const credentials = auth(req);
	if (!credentials) {
		res.status(400).end('Incorrect credentials');
	}
	else {
		req.session.user = 'hi';
		res.end();
	}	
})

exports.logout = ((req,res) => {

})