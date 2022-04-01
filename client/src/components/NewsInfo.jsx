import React, { useEffect, useState } from "react";
import getNewsData from "../helpers/getNewsData";
import { Card } from "antd";

const NewsInfo = (props) => {
	const { search } = props;

	const [newsArticles, setNewsArticles] = useState("");

	useEffect(() => {
		const displayNews = async (search) => {
			const newsData = await getNewsData(search);

			let rederedData = newsData.map((data) => (
				<div>
					<h4>
						Title: <a href={`${data.article_url}`}>{data.title}</a>
					</h4>
					<p>Author: {data.author}</p>
					<p>Published: {data.published_utc.slice(0, 10)}</p>
					<p>{data.description}</p>
				</div>
			));
			setNewsArticles(rederedData);
		};
		displayNews(search);
	}, [search]);
	return <Card>{newsArticles}</Card>;
};

export default NewsInfo;
