import axios from "axios";
import endPoint from "../helpers/endPoint";

const getFinanceData = () => {
	return axios
		.post(`${endPoint()}/polydata`, {
			userQuery: "AAPL",
		})
		.then((response) => response.data);
};

const makeChartData = async () => {
	const arrayOfOb = [];
	let dataObject = await getFinanceData().then((response) => {
		return response.results;
	});

	dataObject.forEach((entry) => {
		arrayOfOb.push({
			x: new Date(entry.t),
			y: [entry.o, entry.h, entry.l, entry.c],
		});
	});
	return arrayOfOb;
};

export default makeChartData;
