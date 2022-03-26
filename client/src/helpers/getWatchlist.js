import axios from "axios";
import endPoint from "../helpers/endPoint";

const getWatchlist = () => {
	return axios
		.get(`${endPoint()}/auth/watchlist/getUserWatchList/`, {
			withCredentials: true,
		})
		.then((response) => response.data);
};

export default getWatchlist;
