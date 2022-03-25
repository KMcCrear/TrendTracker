import React, { useEffect } from "react";
import endPoint from "../helpers/endPoint";
import axios from "axios";

export default function Portfolio(props) {
	const { state } = props;

	useEffect(() => {
		const getWatchListData = () => {
			return axios
				.get(`${endPoint()}/getUserWatchList`, {
					user: state.user,
					userID: state.user.id,
				})
				.then((response) => {
					if (response.data) {
						console.log(response);
					}
				});
		};
		getWatchListData();
	}, [state.user]);

	return (
		<div className="portfolioContainer">
			<h1>User Portfolio</h1>
		</div>
	);
}
