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
						<a class="navBarLink" href="/">
							Home
						</a>
						<a class="navBarLink" href="/stock">
							Stocks
						</a>
						<a class="navBarLink" href="/crypto">
							Crypto
						</a>
						{state.loggedIn ? (
							<a class="navBarLink" href="/logout">
								Logout
							</a>
						) : (
							<a class="navBarLink" href="/login">
								Login
							</a>
						)}
						<a class="navBarLink" href="/portfolio">
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
