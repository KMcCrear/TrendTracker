import React from "react";
import stocksImage from "../images/stocks.webp";
import cryptoImage from "../images/crypto.jpeg";
import portfolioImage from "../images/portfolio.jpg";
import NewsInfo from "../components/NewsInfo";

export default function Home() {
	return (
		<div className="homeContainer">
			<div className="homeHeader">
				<header>
					<h1>Welcome To TrendTracker</h1>
				</header>
			</div>
			<div className="homeMain">
				<main>
					<div className="homePics">
						<a href="/stock">
							<img
								className="homeImg"
								src={stocksImage}
								alt="stocks"
								title="Stocks"
							/>
							<p className="imageDesc">Stocks</p>
						</a>
						<a href="/crypto">
							<img
								className="homeImg"
								src={cryptoImage}
								alt="Crypto"
								title="Crypto"
							/>
							<p className="imageDesc">Crypto Currency</p>
						</a>
						<a href="/portfolio">
							<img
								className="homeImg"
								src={portfolioImage}
								alt="Portfolio"
								title="Portfolio"
							/>
							<p className="imageDesc">Portfolio</p>
						</a>
					</div>
				</main>
				<div id="newsInfo">
					<h2>News/Top articles</h2>
					<NewsInfo tweets={"AAPL"} search={"AAPL"} />
				</div>
			</div>
		</div>
	);
}
