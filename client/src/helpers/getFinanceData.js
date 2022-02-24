import axios from "axios";
import endPoint from "../helpers/endPoint";

const getFinanceData = () => {
	return axios
		.get(`${endPoint()}/polygon/search/ticker/${'AAPL'}`)
		.then((response) => response.data);
};

const makeChartData = async () => {
	const arrayOfOb = [];
	const dataObject = await getFinanceData();

	dataObject.forEach((entry) => {
		arrayOfOb.push({
			x: new Date(entry.t),
			y: [entry.o, entry.h, entry.l, entry.c],
		});
	});
	return arrayOfOb;
};

export default makeChartData;
