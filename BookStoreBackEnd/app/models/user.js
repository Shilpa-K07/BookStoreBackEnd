/*************************************************************************
* Purpose : to recieve request from service layer and then query DB
*
* @file : user.js
* @author : Shilpa K <shilpa07udupi@gmail.com>
* @version : 1.0
* @since : 10/02/2021
*
**************************************************************************/
const userBucket = require('../../config/dbConfig').userBucket;
const N1qlQuery = require('../../config/dbConfig').N1qlQuery;
const uuid = require('uuid').v4;
const config = require('../../config').get();
const { logger } = config;

class UserModel {
  /**
   * @description saving user/admin data into buckets
   *  @method insert is used to save data into bucket
   */
  save = (userData, callBack) => {
    logger.info('creating unique id');
    const id = uuid();
    const query = 'SELECT * FROM `user` WHERE emailId=' + '"' + userData.emailId + '"';
    userBucket.query(
      N1qlQuery.fromString(query), (err, rows) => {
        if (err)
          return callBack(err, null);
        else if (rows.length != 0) {
          return callBack(new Error('ERR-409'), null);
        }
        else
          userBucket.insert(id, userData, (error, result) => {
            return error ? callBack(error, null) : callBack(null, result);
          });
      });
  }

  /**
   * @description finding user for login
   */
  findOne = async (userData, callBack) => {
    var query = N1qlQuery.fromString('SELECT meta().id, * FROM `user` WHERE emailId=' + '"' + userData.emailId + '"');
    await userBucket.query(query, (error, rows) => {
      return (error) ? callBack(error, null) : callBack(null, rows);
    });
  }
}
module.exports = new UserModel();