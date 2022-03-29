import React, { useState, useEffect, useCallback } from "react";
import CandleStick from "../components/CandleStick";
import TweetInfo from "../components/TweetInfo";
import NewsInfo from "../components/NewsInfo";

import "antd/dist/antd.css";
import { Alert, Space } from "antd";

const Dashboard = (props) => {
	const { search } = props;
	const { state } = props;

	if (search) {
		return (
			<div className="dashboardContainer">
				<h1>Dashboard</h1>
				<Space direction="horizontal" style={{ width: "100%" }}>
					<CandleStick search={search} state={state} what="stock"/>
					<TweetInfo search={search} />
				</Space>
				<NewsInfo search={search} />
			</div>
		);
	}
	return (
		<>
			<br />
			<Alert
				type="info"
				message="Search for a ticker name to display information"
			/>
		</>
	);
};

export { Dashboard };
