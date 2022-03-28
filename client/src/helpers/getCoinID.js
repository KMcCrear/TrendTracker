import axios from "axios";
import endPoint from "../helpers/endPoint";

const getCoinID = (search) => {
	return axios
		.get(`${endPoint()}/coingecko/coins/id/${search}`)
		.then((response) => response.data);
};

export default getCoinID;
