import React, { useState, useEffect, useCallback } from "react";
import  CandleStick  from "../components/CandleStick";
import TweetInfo from "../components/TweetInfo";
import 'antd/dist/antd.css';
import {Alert,Space} from 'antd';


const Dashboard = (props) => {
	const {search} = props;
	if(search){
	return (
		<div className="dashboardContainer">
			<h1>Dashboard</h1>
				<Space direction='horizontal' style={{ width: '100%' }}>
					<CandleStick search={search}/>
					<TweetInfo search={search}/>
				</Space>
		</div>
	);
	}
	return(
	<>
		<br/>
		<Alert type='info' message='Search for a ticker name to display information'/>
	</>
	)
};

export { Dashboard };
