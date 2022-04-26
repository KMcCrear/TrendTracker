import React, {useState, useEffect} from "react";
import CandleStick from "../components/CandleStick";
import TweetInfo from "../components/TweetInfo";
import NewsInfo from "../components/NewsInfo";
import '../css/Dashboard.css';
import { Alert } from "antd";
import getTweets from '../helpers/getTweets';

const Dashboard = (props) => {
	const { search } = props;
	const { state } = props;
    const [tweets,setTweets] = useState([]);
	
    useEffect(()=>{
        const getData = async()=>{
            const data = await getTweets(search.toUpperCase());
            setTweets(data);
        }
        getData();
    },[search])

	if (search) {
		return (
			<div className="dashboardContainer">
					<div id='candleGraph'>
						<CandleStick id='candleGraph' search={search} state={state} what="stock"/>
					</div>
					<div id='tweetInfo'>
						<TweetInfo id='tweetInfo' tweets={tweets }search={search} />
					</div>
					<div id='sampleTweets' 
						style={{display:'inline-block', 
							'border-style': 'solid', 
							'border-radius': '20px',
							'margin-left': '5px',	
							'background-color': '#6399B8',
						}}>
					<h3>Sample tweets about {search}</h3>

                    	{tweets.data && tweets.data.slice(0,5).map(tweet=><p>{tweet.text}</p>)}
                	</div>
					<div id='newsInfo'>
						<h2>News/Top articles</h2>
						<NewsInfo tweets={tweets} search={search}/>
					</div>
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

export default Dashboard;
