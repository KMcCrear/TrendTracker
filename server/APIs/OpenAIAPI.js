const express = require('express');
const axios = require("axios");
const router = express.Router();
const {OPENAI_API_TOKEN} = require('../config/APITokens.json');
const { Configuration, OpenAIApi } = require("openai");

router.post('/tweet-sentiment',async(req,res) => {
    // axios
    // .post(`${endPoint()}/openai/tweet-sentiment`)
    // .then((response) => console.log('RESPONSE IS ', response));
    const configuration = new Configuration({
      apiKey: OPENAI_API_TOKEN,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion("text-davinci-001", {
      prompt: "Is the following tweet positive, negative or neutral about Apple?: I love Apple. I think it is the best company in the world.",
    });
    console.log('Tweet IS ', response.data.choices[0].text)
})

  module.exports = router;
