import axios from "axios";
import endPoint from "../helpers/endPoint";

const getFinanceData = (userQuery) => {
	return axios
		.get(`${endPoint()}/polygon/search/ticker/${userQuery}`)
		.then((response) => response.data);
};

export default getFinanceData;
