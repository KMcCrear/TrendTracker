import React, { useState, useEffect, useCallback } from "react";
import { CandleStick } from "../components/CandleStick";

const Dashboard = (props) => {
	const {search} = props;
	const chart = <CandleStick search={search}/>
	return (
		<div className="dashboardContainer">
			<h1>Dashboard</h1>
			{chart}
		</div>
	);
};

export { Dashboard };
