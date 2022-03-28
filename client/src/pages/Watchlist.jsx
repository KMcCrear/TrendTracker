import axios from "axios";
import endPoint from "../helpers/endPoint"
import React, { useEffect, useRef, useState } from "react";
import getWatchlist from "../helpers/getWatchlist";

const Watchlist = () => {
    /*
    * I know using a ref is an absolutly terrible way to fix this issue however I have yet to find a better way to do this
    * The issue of stateWatchlist being empty within the remove function is due to a "stale closure", and the only way to
    * fix it within a useEffect is to have it in the useEffect's dependecies, however this leads to the entire database
    * retrieval process occuring again when a user clicks remove, as this changes the state of the watchlist which in turn
    * overrides any actions that have took place anyway.
    * https://dmitripavlutin.com/react-hooks-stale-closures/
    */
    const [stateWatchlist, setStateWatchlist] = useState([]);
    const actualWatchlist = useRef([]);
    useEffect(() => {
        function remove(id) {
            axios({
                method: 'DELETE',
                url: `${endPoint()}/auth/watchlist/delete/${id}`,
                withCredentials: true
            }).then(() => {
                actualWatchlist.current = actualWatchlist.current.filter(row => row.key != id);
                setStateWatchlist(actualWatchlist.current);
            }).catch(() => {
                alert('Unable to remove');
            })
        }

        getWatchlist().then((data) => {
            actualWatchlist.current = data.map((d) => (
                <tr key={d.listID}>
                    <td>{d.identifier}</td>
                    <td>{d.what}</td>
                    <td><a href={'/'}>View</a></td>
                    <td><a onClick={() => remove(d.listID)}>Remove</a></td>
                </tr>
            ))
            setStateWatchlist(actualWatchlist.current);
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
                    <tbody>{stateWatchlist}</tbody>
                </table>
            </div>
        </div>
    );
}

export default Watchlist
