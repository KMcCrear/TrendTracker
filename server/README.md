# TrendTracker Backend Docs

TrendTracker's backend has been developed to act as a RESTful API, through the use of mainly [Node.js](https://nodejs.org), [Express.js](https://www.npmjs.com/package/express), [CORS](https://www.npmjs.com/package/cors), [Axios](https://www.npmjs.com/package/axios) and more. See [package.json](./package.json) for a full list of dependencies.

If you havent started the backend before, in the server directory's console type:

### `npm install`

To start the backend, in the server directory's console type:

###  `node index.js`

# APIS

'*' = required

The backend currently provides access to 7 API categories, split into a authorized and unauthorized section:

## Unauthorized APIs
These APIs are free to use and do not require any previous authentication before accessing.

---
### Twitter
The Twitter API is accessed through `/twitter` , see [TwitterAPI.js](./APIs/TwitterAPI.js)
- GET `twitter/search/recent/{SEARCHTERM}` - Searches and returns the latest 10 tweets related to the search term
    - `SEARCHTERM`* - Topic of tweets to return
    - <ins>Examples</ins>:  
    `twitter/search/recent/AAPL` - Returns latest 10 tweets related to AAPL

### Polygon.io
The Polygon.io API is accessed through `/polygon` , see [PolygonAPI.js](./APIs/PolygonAPI.js)  
- GET `polygon/search/ticker/{STOCK TICKER}` - Searches and returns graph data of the provided ticker, up to a max of 30 data points
    - `STOCK TICKER`* - ticker of stock data, e.g. AAPL
    - `range` - range to look into past. Defaults to 'day'. Valid values: day, week, month, quarter, year, 2year
    - <ins>Examples</ins>:  
    `polygon/search/ticker/AAPL?range=week` - Returns last week of AAPLs graph data  
    `polygon/search/ticker/TSLA` - Returns last day of TSLAs graph data
- GET `polygon/search/news/{STOCK TICKER}` - Searches and returns up to 10 related news items
    - `STOCK TICKER`* - ticker of stock data, e.g. AAPL
    - <ins>Examples</ins>:  
    `polygon/search/news/AAPL` - Returns up to 10 related news items of AAPL
- GET `polygon/search/company/{SEARCH TERM}` - Searches and returns up to 10 companies related to the search term
    - `SEARCH TERM`* - term to search for, e.g. apple
    - <ins>Examples</ins>:  
    `polygon/search/company/apple` - Returns up to 10 companies that have relation to the word 'apple'

### CoinMarketCap
The CoinMarketCap API is accessed through `/marketcap` , see [MarketCapAPI.js](./APIs/MarketCapAPI.js)
- GET `marketcap/trending/latest` - Searches and returns the latest 10 trending crypto currencies

### OpenAI
The OpenAI API is accessed through `/openai` , see [OpenAIAPI.js](./APIs/OpenAIAPI.js)
- POST `openai/tweet-sentiment` - Determines and returns the sentiment of a specific tweet about a specific topic. 
Pass the topic and the text to be analysed as the body of the request

### CoinGecko
The CoinGecko API is accessed through `/coingecko` , see [CoinGeckoAPI.js](./APIs/CoinGeckoAPI.js)
- GET `coingecko/coins/market_chart/{COIN}` - Searches and returns graph data of the provided coin
    - `COIN`* - name of coin, e.g. bitcoin
    - <ins>Examples</ins>:   
    `coingecko/coins/market_chart/bitcoin` - Returns last 31 days of bitcoin graph data
- GET `coingecko/coins/id/{COIN}` - Searches and returns current market data of the provided coin
    - `COIN`* - name of coin, e.g. bitcoin
    - <ins>Examples</ins>:   
    `coingecko/coins/id/bitcoin` - Returns current market data of bitcoin

## Authorized APIs
These APIs require prior authentication to use with the exception of the Login API. Use this API to authenticate yourself for the use of the other authenticated APIs.

---
### Login
The login API is accessed through `/auth`, see [LoginAPI.js](./APIs/auth/LoginAPI.js)
- POST `auth/login` - Logs in the user with the use of their username and password and returns 2 session cookies. Pass the username and password through the Authorization header of the request in the Basic format. See https://en.wikipedia.org/wiki/Basic_access_authentication#Client_side
- POST `auth/logout` - Logs the user out and destroys the users session cookies.
- POST `auth/register/{FORENAME}/{SURNAME}` - Registers a new user with the provided fore and surname. Pass the username and password the same way as in `auth/login`
    - `FORENAME`* - Forename of the new user
    - `SURNAME`* - Surname of the new user
    - <ins>Examples</ins>:   
    `auth/register/John/Doe` - Registers a new user with the name John Doe and with the username and password specified in the Authorization request header.
- GET `auth/login` - Returns current state of the user as a session cookie named 'state'.

### Watchlist
The Watchlist API is accessed through `/auth/watchlist`, see [Watchlist.js](./APIs/auth/WatchlistAPI.js). Prior authentication is required to access this API
- GET `auth/watchlist/getUserWatchList` - Returns the watchlist of the logged in user.
- GET `auth/watchlist/has/{IDENTIFIER}` - Returns a boolean value indicating if the user has this asset in their watchlist.
    - `IDENTIFIER`* - Asset Identifier e.g. AAPL, bitcoin
    - <ins>Examples</ins>:   
    `auth/watchlist/has/AAPL` - Returns 'true' or 'false' depending on whether the user has AAPL as part of their watchlist.
- POST `auth/watchlist/add/{TYPE}/{IDENTIFIER}` - Adds the asset of the identifier to the users watchlist
    - `TYPE`* - Type of asset, either 'crypto' or 'stock'
    - `IDENTIFIER`* - Asset Identifier e.g. AAPL, bitcoin
    - <ins>Examples</ins>:   
    `auth/watchlist/add/crypto/bitcoin` - Adds bitcoin to the users watchlist
- DELETE `auth/watchlist/delete/{IDENTIFIER}` - Deletes the asset of the identifier from the users watchlist
    - `IDENTIFIER`* - Asset Identifier e.g. AAPL, bitcoin
    - <ins>Examples</ins>:   
    `auth/watchlist/delete/bitcoin` - Removes bitcoin to the users watchlist

## Build
TBC