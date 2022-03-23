import axios from "axios";
import endPoint from "../helpers/endPoint";

const getCoinData = (search) => {
	return axios
		.get(`${endPoint()}/coingecko/coins/market_chart/${search}`)
		.then((response) => response.data);
};

export default getCoinData;
