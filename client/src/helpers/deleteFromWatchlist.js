import axios from "axios";
import endPoint from "../helpers/endPoint";

const deleteFromWatchlist = (listID) => {
	return axios({
        method: 'DELETE',
        withCredentials: true,
        url: `${endPoint()}/auth/watchlist/delete/${listID}`
    })
    .then((response) => response.data)
};

export default deleteFromWatchlist;