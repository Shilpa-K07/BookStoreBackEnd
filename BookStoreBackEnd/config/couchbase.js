/**************************************************************************
* Purpose : to establish DB connection
*
* @file : couchbase.js
* @author : Shilpa K <shilpa07udupi@gmail.com>
* @version : 1.0
* @since : 10/02/2021
*
**************************************************************************/

const config = require('./').get();
var couchbase = require('couchbase');

var cluster = new couchbase.Cluster(config.database.dbURL, {
    username: config.database.username,
    password: config.database.password,
})
var bucket = cluster.bucket('book-store', (err) => {
    if (err) {
        console.error('Got error : ', err)
    }
    else{
        console.log('Successfully connected to couchbase')
    }
})

module.exports.bucket = bucket