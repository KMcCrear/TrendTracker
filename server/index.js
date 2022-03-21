const express = require("express");
const cors = require("cors");
const session = require("express-session");
const auth = require("basic-auth");
const { HOST, PORT } = require("./config/host.json");

const app = express();

//middleware
/*app.use(function (req, res, next) {
	//res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Request-With, Content-Type, Accept"
	);
	next();
});*/

app.use(express.json());

app.use(
	cors({
		origin: [`${HOST}:${PORT-1}`],
		methods: ["GET", "POST", "PUT"],
		credentials: true
	})
);

app.use(
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

//API imports
const twitterapi = require("./APIs/TwitterAPI");
const polygonapi = require("./APIs/PolygonAPI");
const marketcapapi = require("./APIs/MarketCapAPI");
const openAiApi = require("./APIs/OpenAIAPI");

//API uses
app.use("/twitter", twitterapi);
app.use("/polygon", polygonapi);
app.use("/marketcap", marketcapapi);
app.use("/openai", openAiApi);

app.post('/login',(req,res) => {
	const credentials = auth(req);
	if (!credentials) {
		res.status(401).end('Incorrect credentials');
	}
	else {
		//check credentials and return from database
		res.end();
	}	
})

app.listen(PORT, () => {
	console.log(`Server Running on Port ${PORT}`);
});
