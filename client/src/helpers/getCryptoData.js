import axios from "axios";
import endPoint from "../helpers/endPoint";

const getCryptoData = () => {
	return axios
		.get(`${endPoint()}/marketcap/trending/latest`)
		.then((response) => response.data);
};

export default getCryptoData;
