const express = require("express");
const cors = require("cors");

const serverPort = 3001;

const app = express();

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Request-With, Content-Type, Accept"
	);
	next();
});
app.use(express.json());

app.use(
	cors({
		origin: ["http://localhost:3000"],
		methods: ["GET", "POST", "PUT"],
		credentials: true,
	})
);

app.listen(serverPort, () => {
	console.log(`Server Running on Port ${serverPort}`);
});
