import React, {useState } from "react";

function NavBar(props) {
	const { state } = props;
	const [showLinks, setShowLinks] = useState(false);
	let tempInput = "";

	const afunc = (e) => {
		e.preventDefault();
		props.setInput(tempInput);
	};

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
					<div className="searchContainer">
						<form onSubmit={afunc}>
							<input
								type="text"
								placeholder={"Search Company Ticker"}
								onChange={(e) => {
									tempInput = e.target.value;
								}}
							/>
							<button type="submit">Search</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export { NavBar };
