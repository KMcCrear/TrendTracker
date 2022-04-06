import getCoinData from "./getCoinData";

const makeCoinData = async (userQuery) => {
	const data = await getCoinData(userQuery);

	let coinAarry = data.prices;
    let arrayToSend = [];

    coinAarry.forEach((entry) => {
        arrayToSend.push({
            x: new Date(entry[0]),
            y: [entry[1]],
        });
    });

	return arrayToSend;
};

export default makeCoinData;