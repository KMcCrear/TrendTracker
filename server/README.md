# TrendTracker Backend Docs

TrendTracker's backend has been developed to act as a RESTful API, through the use of [Node.js](https://nodejs.org), [Express.js](https://www.npmjs.com/package/express), [CORS](https://www.npmjs.com/package/cors) and [Axios](https://www.npmjs.com/package/axios).

To start the backend, in the server directories console type:

###  `node index.js`

## APIS

The backend currently has access to 2 APIs:

### Twitter
The Twitter API is accessed through `/twitter` , see [TwitterAPI.js](./APIs/TwitterAPI.js)
- `twitter/search/{SEARCHTERM}` - Searches and returns the latest 10 tweets related to the search term

### Yahoo Fianance
The Yahoo fianance API is accessed through `/yf` , see [YahooFiananceAPI.js](./APIs/YahooFiananceAPI.js)

## Build
TBC