/*************************************************************************
* Purpose : to recieve request from service layer and then query DB
*
* @file : user.js
* @author : Shilpa K <shilpa07udupi@gmail.com>
* @version : 1.0
* @since : 10/02/2021
*
**************************************************************************/
//const collection = require('../../config/dbConfig').collection;
const bucket = require('../../config/dbConfig').bucket;
const N1qlQuery = require('../../config/dbConfig').N1qlQuery;
const uuid = require('uuid').v4;
const config = require('../../config').get();
const { logger } = config;
//var couchbase = require('couchbase');

class UserModel {
  /**
   * @description saving user data into buckets
   *  @method insert is used to save data into bucket
   */
  save = (userData, callBack) => {
    logger.info('creating unique id');
    const id = uuid();
    // var N1qlQuery = couchbase.N1qlQuery;
    bucket.query(
      N1qlQuery.fromString('SELECT * FROM `book-store` WHERE emailId=' + '"' + userData.emailId + '"'), (err, rows) => {
        if (rows.length == 0) {
          bucket.insert(id, userData, (error, result) => {
            return error ? callBack(error, null) : callBack(null, result);
          });
        }
        else return callBack(new Error('ERR-409'), null);
      });
    /* var query = N1qlQuery.fromString('SELECT * FROM book-store');
    bucket.query(query, function(err, rows, meta) {
      for (row in rows) {
        console.log('Name: %s. Email: %s', rows[row].name, rows[row].email);
      }
    }); */

    /*  collection.insert(id, userData, (error, result) => {
       return error ? callBack(error, null) : callBack(null, result);
     }); */
  }
}
module.exports = new UserModel();