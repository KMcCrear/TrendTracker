import React, { useEffect, useState } from "react";
import { CandleStick } from "../components/CandleStick";
import makeChartData from "./makeChartData";
import { retriveData } from "../pages/Dashboard";

let dataObj = [];

function updateOnSearch(data) {
	makeChartData(data).then((res) => {
		dataObj = res;
	});
}

function returnDataToChart() {
	console.log("IN UPdate");
	return dataObj;
}
export { updateOnSearch, returnDataToChart };
