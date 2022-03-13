const express = require('express');
const router = express.Router();
const {OPENAI_API_TOKEN} = require('../config/APITokens.json');
const { Configuration, OpenAIApi } = require("openai");

router.post('/tweet-sentiment',async(req,res) => {

    const {search, text} = req.body;
    const configuration = new Configuration({
      apiKey: OPENAI_API_TOKEN,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion("text-davinci-001", {
      prompt: `Decide whether the following tweet is positive, negative or neutral about ${search}?: ${text}`,
    })
    res.send(response.data)
    console.log('----------------- TWEET - ', text,' - for -', search ,' - IS -', response.data.choices[0].text)
})

  module.exports = router;
