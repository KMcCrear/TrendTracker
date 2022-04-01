import axios from "axios";
import endPoint from "./endPoint";

const hasWatchlistItem = (identifier) => {
	return axios({
        method: 'GET',
        withCredentials: true,
        url: `${endPoint()}/auth/watchlist/has/${identifier}`
    }).then((response) => response.data);
};

export default hasWatchlistItem;