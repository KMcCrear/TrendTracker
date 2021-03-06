import React, { useState } from "react";
import SearchBar from "./SearchBar";
import "../css/Navbar.css";

function NavBar(props) {
	const { state } = props;
	return (
		<div>
			<div className="Navbar">
				<div className="leftSide">
					<div className="links">
						<a className="navBarLink" href="/">
							Home
						</a>
						<a className="navBarLink" href="/stock">
							Stocks
						</a>
						<a className="navBarLink" href="/crypto">
							Crypto
						</a>
						{state.loggedIn ? (
							<a className="navBarLink" href="/logout">
								Logout
							</a>
						) : (
							<a className="navBarLink" href="/login">
								Login
							</a>
						)}
						<a className="navBarLink" href="/portfolio">
							Portfolio
						</a>
					</div>
				</div>
				<div className="rightSide">
					<SearchBar />
				</div>
			</div>
		</div>
	);
}

export { NavBar };
