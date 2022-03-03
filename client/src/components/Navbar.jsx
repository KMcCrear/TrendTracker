import React, { useState } from "react";
// import ReorderIcon from "@material-ui/icons/Reorder";

export default function NavBar() {
	const [showLinks, setShowLinks] = useState(false);
	return (
		<div>
			<div className="Navbar">
				<div className="leftSide">
					<div className="links" id={showLinks ? "hidden" : ""}>
						<a href="/">Dashboard</a>
						<a href="/stocks">Stocks</a>
						<a href="/crypto">Crypto</a>
					</div>
					<button onClick={() => setShowLinks(!showLinks)}>
						{/* <ReorderIcon /> */}
					</button>
				</div>
				<div className="rightSide">
					<div className="links" id={showLinks ? "hidden" : ""}>
						<a href="/login">Login</a>
					</div>
				</div>
			</div>
		</div>
	);
}
