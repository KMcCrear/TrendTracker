import axios from "axios";
import endPoint from "../helpers/endPoint";

const addToWatchlist = (identifier,type) => {
	return axios({
        method: 'POST',
        withCredentials: true,
        url: `${endPoint()}/auth/watchlist/add/${type}/${identifier}`
    }).then((response) => response.data);
};

export default addToWatchlist;