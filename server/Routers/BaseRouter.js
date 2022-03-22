const express = require("express");
const baseRouter = express.Router();

//API imports
const twitterapi = require("../APIs/TwitterAPI");
const polygonapi = require("../APIs/PolygonAPI");
const marketcapapi = require("../APIs/MarketCapAPI");
const openAiApi = require("../APIs/OpenAIAPI");

//API uses
baseRouter.use("/twitter", twitterapi);
baseRouter.use("/polygon", polygonapi);
baseRouter.use("/marketcap", marketcapapi);
baseRouter.use("/openai", openAiApi);

module.exports = baseRouter;