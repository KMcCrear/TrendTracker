import React, { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

const Coins = () => {
	const { searchParams } = useLocation();
	const history = useLocation();
	const query = history.pathname;

	useEffect(() => {
		console.log(query.slice(7));
	}, [searchParams]);

	return <div>Coins bro</div>;
};

export default Coins;
