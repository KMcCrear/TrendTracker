import axios from "axios";
import endPoint from "../helpers/endPoint";

const getFinanceData = () => {
	return axios
		.get(`${endPoint()}/polygon/search/ticker/${"AAPL"}`)
		.then((response) => response.data);
};

export default getFinanceData;
