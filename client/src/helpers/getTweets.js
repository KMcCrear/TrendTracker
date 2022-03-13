import axios from "axios";
import endPoint from "../helpers/endPoint";

const getTweets = (search) => {
    return axios.get(`${endPoint()}/twitter/search/recent/${search}`)
}
export default getTweets;