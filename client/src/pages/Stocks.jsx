import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import getFinanceData from "../helpers/getFinanceData";
import CandleStick from "../components/CandleStick";
import addToWatchList from "../helpers/addToWatchlist";

export default function Stocks(props) {
	const history = useLocation();
	const {state} = props;
	const {ticker} = useParams();

	if (ticker) {
		return (
			<div className="stocksContainer">
				<h1>Stocks</h1>
				<CandleStick search={ticker} state={state} what="stock"/>
			</div>
		);
	} else {
		return (
			<div className="stocksContainer">
				<h1>Stocks</h1>
			</div>
		);
	}
}
