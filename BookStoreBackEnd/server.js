const express = require('express');
var couchbase = require('couchbase')
const bodyParser = require('body-parser');
require('dotenv').config();
const logger = require('./app/logger/logger');

const app = express();
app.use(bodyParser.json());
var cluster = new couchbase.Cluster('couchbase://localhost', {
  username: process.env.COUCH_USERNAME,
  password:  process.env.COUCH_PASSWORD,
})
var bucket = cluster.bucket('book-store',  (err) => {
    if (err) {
      console.error('Got error: ', err)
    }
  } )
 
module.exports.bucket = bucket

// require user routes
require('./app/routes/user')(app)

/**
 * @description listen for requests
 * @param process.env.PORT is the port number 3000
 */
app.listen(process.env.PORT, () => {
  logger.info("Server is listening on port ", process.env.PORT);
})