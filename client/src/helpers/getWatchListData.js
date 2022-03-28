import axios from "axios";
import endPoint from "../helpers/endPoint";

const getWatchListData = (userID) => {
	return axios
		.get(`${endPoint()}/getUserWatchList`)
		.then((response) => response.data);
};

export default getWatchListData;
