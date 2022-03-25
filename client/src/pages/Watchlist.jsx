import React, { useEffect, useState } from "react";
import getWatchlist from "../helpers/getWatchlist";

const Watchlist = () => {
	const [watchlist, setWatchlist] = useState([]);
	useEffect(() => {
		getWatchlist()
			.then((data) => {
				let renderedData = data.map((d) => (
					<tr key={d.listID}>
						<td>{d.what}</td>
						<td>{d.identifier}</td>
						<td>
							<a href={"/"}>View</a>
						</td>
						<td>
							<button onClick={remove.bind(null, d.listID)}>Remove</button>
						</td>
					</tr>
				));
				setWatchlist(renderedData);
			})
			.catch((e) => {
				console.log(e);
			});

		function remove(id) {
			//this doesnt work, watchlist is empty despite it being set previously
			const newWatchlist = watchlist.filter((row) => row.key !== id);
			test(newWatchlist);
		}
	}, [watchlist]);

	return (
		<div>
			<h1>Watchlist</h1>
			<div>
				<table>
					<thead>
						<tr>
							<th>Identifier</th>
							<th>Type</th>
						</tr>
					</thead>
					<tbody>{watchlist}</tbody>
				</table>
			</div>
		</div>
	);
};

export default Watchlist;
