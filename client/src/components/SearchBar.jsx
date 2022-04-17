import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import endPoint from "../helpers/endPoint";
import '../css/SearchBar.css'
function SearchBar() {
    const hasCryptoData = useRef(false);
    const hasStockData = useRef(false);
    const baseList = useRef([]);

    const searchDataRef = useRef([]);
    const [searchData,setSearchData] = useState("")

	const onceSubmitted = (e) => {
		e.preventDefault();
	};

    const onNewSearch = async (e) => {
        const search = e.target.value.toLowerCase();

        if (!hasCryptoData.current) {
            hasCryptoData.current = true;
            baseList.current = await axios({
                method: "GET",
                url: `${endPoint()}/coingecko/coins/all`
            }).then((response) => {
                return response.data;
            });
            searchDataRef.current = baseList.current;
        }

        if (!hasStockData.current && search.length > 2) {
            hasStockData.current = true;
            const stock = await axios({
                method: "GET",
                url: `${endPoint()}/polygon/search/company/${search}`
            }).then((response) => {
                return response.data.map((d) => {
                    return {name: d.name, symbol: d.ticker, type: "stock"}
                });
            });
            searchDataRef.current = baseList.current.concat(stock)
        }
        else if (search.length < 2) {
            hasStockData.current = false;
        }

        setSearchData(
            searchDataRef.current.filter((d) => {
                return d.name.toLowerCase().startsWith(search) || d.symbol.toLowerCase().startsWith(search);
            })
            .slice(0,30)
            .map((d) => {
                let type = d.type;
                let id = d.symbol;
                if (!type) {
                    type = "crypto"
                    id = d.id;
                }
                return (
                    <a className="searchContent" href={`/${type}/${id}`} key={id}>
                        <h2>{id}</h2>
                        <p>{d.name}</p>
                        <p>{type}</p>
                    </a>
                )
            })
        )
    }

    return (
        <div className="searchContainer">
    
            <div style={{display: 'inline-block', width:'120%'}} className="searchBar">
                <form onSubmit={onceSubmitted}>
                    <input
                        id='searchInput'
                        type="text"
                        placeholder={"Search Company Ticker"}
                        onChange={onNewSearch}
                    />
                    <button id="searchButton" type="submit">Search</button>
                </form>
            </div>
            <div className="searchList">
                {searchData}
            </div>
        </div>
    )
}

export default SearchBar;