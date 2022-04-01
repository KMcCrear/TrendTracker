import React, { useEffect, useState } from "react";
import getNewsData from "../helpers/getNewsData";

const NewsInfo = (props) => {
	const { search } = props;

	const [newsArticles, setNewsArticles] = useState("");

	useEffect(() => {
		const displayNews = async (search) => {
			const newsData = await getNewsData(search);

			let rederedData = newsData.map((data) => (
				<table className="articleTable" key={data.title}>
					<tbody>
						<tr>
							<td>
								Title: <a href={`${data.article_url}`}>{data.title}</a>
							</td>
							<td>Author: {data.author}</td>
							<td>Published: {data.published_utc}</td>
						</tr>
					</tbody>
				</table>
			));
			setNewsArticles(rederedData);
		};
		displayNews(search);
	}, [search]);
	return <div>{newsArticles}</div>;
};

export default NewsInfo;
