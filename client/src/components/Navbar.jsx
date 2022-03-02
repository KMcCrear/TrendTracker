import React, { useState } from "react";
import getFinanceData from "../helpers/getFinanceData";
// import ReorderIcon from "@material-ui/icons/Reorder";

export default function NavBar() {
	const [showLinks, setShowLinks] = useState(false);
	const [userQuery, setUserQuery] = useState("");
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
					<div className="searchContainer">
						<form>
							<input
								type="text"
								onChange={(e) => setUserQuery(e.target.value)}
								onSubmit={getFinanceData(userQuery)}
							/>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
