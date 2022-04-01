import axios from "axios";
import endPoint from "../helpers/endPoint";

const getSingleTicker = (userQuery) => {
	return axios
		.get(`${endPoint()}/polygon/search/singleticker/${userQuery}`)
		.then((response) => response.data);
};

export default getSingleTicker;
