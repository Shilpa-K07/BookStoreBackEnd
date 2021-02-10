/*************************************************************************
* Purpose : to recieve request from service layer and then query DB
*
* @file : user.js
* @author : Shilpa K <shilpa07udupi@gmail.com>
* @version : 1.0
* @since : 10/02/2021
*
**************************************************************************/
const bucket = require('../../config/couchbase').bucket
const uuid = require('uuid').v4
const config = require('../../config').get();
const { logger } = config;

class UserModel {
  /**
   * @description saving user data into buckets
   *  @method insert is used to save data into bucket
   */
    save = (userData, callBack) => {
          const id = uuid()
          bucket.collection().insert(id, userData, (error, result) => {
            if(error)
              return callBack(error, null)
            return callBack(null, result)
          })
    }
}
module.exports = new UserModel();