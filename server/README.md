# TrendTracker Backend Docs

TrendTracker's backend has been developed to act as a RESTful API, through the use of [Node.js](https://nodejs.org), [Express.js](https://www.npmjs.com/package/express), [CORS](https://www.npmjs.com/package/cors) and [Axios](https://www.npmjs.com/package/axios).

To start the backend, in the server directory's console type:

###  `node index.js`

## APIS

'*' = required

The backend currently has access to 3 APIs:

### Twitter
The Twitter API is accessed through `/twitter` , see [TwitterAPI.js](./APIs/TwitterAPI.js)
- `twitter/search/recent/{SEARCHTERM}` - Searches and returns the latest 10 tweets related to the search term

### Polygon.io
The Polygon.io API is accessed through `/polygon` , see [PolygonAPI.js](./APIs/PolygonAPI.js)  
- `polygon/search/ticker/{STOCK TICKER}` - Searches and returns stock data, up to a max of 30 data points
    - `STOCK TICKER`* - ticker of stock data, e.g. AAPL
    - `range` - range to look into past. Defaults to 'day'. Valid values: day, week, month, quarter, year, 2year
    - <ins>Examples</ins>:  
    `polygon/search/ticker/AAPL?range=week` - Returns last week of AAPLs data  
    `polygon/search/ticker/TSLA` - Returns last day of TSLAs data
- `polygon/search/news/{STOCK TICKER}` - Searches and returns up to 10 related news items
    - `STOCK TICKER`* - ticker of stock data, e.g. AAPL
    - <ins>Examples</ins>:  
    `polygon/search/news/AAPL` - Returns up to 10 related news items of AAPL
- `polygon/search/company/{SEARCH TERM}` - Searches and returns up to 10 companies related to the search term
    - `SEARCH TERM`* - term to search for, e.g. apple
    - <ins>Examples</ins>:  
    `polygon/search/company/apple` - Returns up to 10 companies that have relation to the word 'apple'

### CoinMarketCap
The CoinMarketCap API is accessed through `/marketcap` , see [MarketCapAPI.js](./APIs/MarketCapAPI.js)
- `marketcap/trending/latest` - Searches and returns the latest trending crypto currencies

### OpenAI
The OpenAI API is accessed through `/openai` , see [OpenAIAPI.js](./APIs/OpenAIAPI.js)

## Build
TBC