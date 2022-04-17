import React, {useState } from "react";
import SearchBar from "./SearchBar";

function NavBar(props) {
	const { state } = props;
	const [showLinks, setShowLinks] = useState(false);

	return (
		<div>
			<div className="Navbar">
				<div className="leftSide">
					<div className="links" id={showLinks ? "hidden" : ""}>
						<a href="/">Dashboard</a>
						<a href="/stock">Stocks</a>
						<a href="/crypto">Crypto</a>
						{state.loggedIn ? <a href="/logout">Logout</a>:<a href="/login">Login</a>}
						<a href="/portfolio">Portfolio</a>
					</div>
					<button onClick={() => setShowLinks(!showLinks)}>
						{/* <ReorderIcon /> */}
					</button>
				</div>
				<div className="rightSide">
					<SearchBar/>
				</div>
			</div>
		</div>
	);
}

export { NavBar };
