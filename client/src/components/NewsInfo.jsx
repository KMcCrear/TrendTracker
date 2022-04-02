import React, { useEffect, useState } from "react";
import getNewsData from "../helpers/getNewsData";
import { Card } from "antd";
import '../css/Dashboard.css'

const NewsInfo = (props) => {
	const { search } = props;

	const [newsArticles, setNewsArticles] = useState("");

	useEffect(() => {
		const displayNews = async (search) => {
			const newsData = await getNewsData(search);
			let rederedData = newsData.slice(0,3).map((data) => (
				<div id='newsCard'>
					<img style={{width:'40%'}} alt='' src={data.image_url}/>
					<h4>
						<a href={`${data.article_url}`}>{data.title}</a>
					</h4>
					<p>{data.description.slice(0,100)}...</p>
					<p>Author: {data.author}</p>
					<p>Published: {data.published_utc.slice(0, 10)}</p>
				</div>
			));
			setNewsArticles(rederedData);
		};
		displayNews(search);
	}, [search]);
	return <Card>{newsArticles}</Card>;
};

export default NewsInfo;
