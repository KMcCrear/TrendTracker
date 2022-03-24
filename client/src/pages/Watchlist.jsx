import React, { useEffect, useState } from "react";
import getWatchlist from "../helpers/getWatchlist";

const Watchlist = () => {
    const [watchlist, setWatchlist] = useState("");
    useEffect(() => {
        getWatchlist().then((data) => {
            let renderedData = data.map((d) => (
                <tr key={d.listID}>
                    <td>{d.what}</td>
                    <td>{d.identifier}</td>
                    <td><a href={'/'}>View</a></td>
                </tr>
            ))
            setWatchlist(renderedData);
        }).catch((e) => {console.log(e)})
    },[])

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
}

export default Watchlist