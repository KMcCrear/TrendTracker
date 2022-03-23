import axios from "axios";
import endPoint from "../helpers/endPoint";

const getNewsData = (search) => {
	return axios
		.get(`${endPoint()}/polygon/search/news/${search}`)
		.then((response) => response.data);
};

export default getNewsData;
