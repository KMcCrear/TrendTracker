import { serialize } from "nedb/lib/model";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Coins = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		console.log(searchParams);
	}, [searchParams]);

	return <div>Coins bro</div>;
};

export default Coins;
