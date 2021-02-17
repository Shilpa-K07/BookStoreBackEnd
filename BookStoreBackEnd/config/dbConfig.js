/**************************************************************************
* Purpose : to establish DB connection
*
* @file : couchbase.js
* @author : Shilpa K <shilpa07udupi@gmail.com>
* @version : 1.0
* @since : 10/02/2021
*
**************************************************************************/

const config = require('.').get();
var couchbase = require('couchbase');

var cluster = new couchbase.Cluster(config.database.dbURL/* , {
    username: config.database.username,
    password: config.database.password,
} */);
cluster.authenticate(config.database.username, config.database.password);
var userBucket = cluster.openBucket('user', (err) => {
    if (err) {
        console.error('Got error : ', err);
    }
});

var bookBucket = cluster.openBucket('books', (err) => {
    if (err) {
        console.error('Got error : ', err);
    }
});

var N1qlQuery = couchbase.N1qlQuery;
//var collection = bucket.collection();

module.exports = {
    //collection: collection,
    userBucket: userBucket,
    bookBucket: bookBucket,
    N1qlQuery: N1qlQuery
};