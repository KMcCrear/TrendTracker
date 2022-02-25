# TrendTracker Backend Docs

TrendTracker's backend has been developed to act as a RESTful API, through the use of [Node.js](https://nodejs.org), [Express.js](https://www.npmjs.com/package/express), [CORS](https://www.npmjs.com/package/cors) and [Axios](https://www.npmjs.com/package/axios).

To start the backend, in the server directories console type:

###  `node index.js`

## APIS

The backend currently has access to 2 APIs:

### Twitter
The Twitter API is accessed through `/twitter` , see [TwitterAPI.js](./APIs/TwitterAPI.js)
- `twitter/search/recent/{SEARCHTERM}` - Searches and returns the latest 10 tweets related to the search term

### Polygon.io
The Polygon.io API is accessed through `/polygon` , see [PolygonAPI.js](./APIs/PolygonAPI.js)
- `polygon/search/ticker/{STOCK TICKER}` - Searches and returns the last week of stock data

## Build
TBC