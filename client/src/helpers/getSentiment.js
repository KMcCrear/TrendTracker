import axios from "axios";
import endPoint from "../helpers/endPoint";

const getSentiment = (search, text)=>{
    console.log('SENTIMENT FOR ', search);
    return axios
        .post(`${endPoint()}/openai/tweet-sentiment`,{
            text, search
        })
        .then((response) => response.data.choices[0].text);
}

export default getSentiment;