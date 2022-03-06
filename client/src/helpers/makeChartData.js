import getFinanceData from "./getFinanceData";

const makeChartData = async (userQuery) => {
	const arrayOfOb = [];
	const dataObject = await getFinanceData(userQuery);

	dataObject.forEach((entry) => {
		arrayOfOb.push({
			x: new Date(entry.t),
			y: [entry.o, entry.h, entry.l, entry.c],
		});
	});

	return arrayOfOb;
};

export default makeChartData;
