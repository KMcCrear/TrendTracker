import makeChartData from "./makeChartData";
import { retriveData } from "../pages/Dashboard";

let dataObj = [];

function updateOnSearch(data) {
	makeChartData(data).then((res) => {
		dataObj = res;
		retriveData();
	});
}

function returnDataToChart() {
	return dataObj;
}
export { updateOnSearch, returnDataToChart };
