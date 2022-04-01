import axios from "axios";
import endPoint from "../helpers/endPoint";

const deleteFromWatchlist = (identifier) => {
	return axios({
        method: 'DELETE',
        withCredentials: true,
        url: `${endPoint()}/auth/watchlist/delete/${identifier}`
    })
    .then((response) => response.data)
};

export default deleteFromWatchlist;