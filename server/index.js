const express = require("express");
const cors = require("cors");

const { HOST, PORT } = require("./config/host.json");
const app = express();

//middleware
app.use(express.json());

app.use(
	cors({
		origin: [`${HOST}:${PORT-1}`],
		methods: ["GET", "POST", "PUT","DELETE"],
		credentials: true
	})
);

//router imports
const baseRouter = require("./Routers/BaseRouter");
const authRouter = require("./Routers/AuthRouter")

//base api
app.use('/',baseRouter)
//authenticated API, must authenticate with login before accessing other routes
app.use('/auth',authRouter);

app.listen(PORT, () => {
	console.log(`Server Running on Port ${PORT}`);
});
