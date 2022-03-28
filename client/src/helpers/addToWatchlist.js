import axios from "axios";
import endPoint from "../helpers/endPoint";

const addToWatchList = (type, id) => {
	return axios
		.post(`${endPoint()}/auth/watchlist/add/${type}/${id}`, {
			withCredentials: true,
		})
		.then((response) => response.data);
};

export default addToWatchList;
