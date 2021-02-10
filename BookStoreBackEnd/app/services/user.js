/*************************************************************************
* Purpose : to recieve request from controller and send it to model layer 
    and perform some intermediate business logic
*
* @file : user.js
* @author : Shilpa K <shilpa07udupi@gmail.com>
* @version : 1.0
* @since : 10/02/2021
*
**************************************************************************/
const userModel = require("../models/user");
const util = require("../utility/util");
const config = require('../../config').get();
const { logger } = config;

class UserService {
    /**
     * @description user registration
     * @method register is called from controller.It again calls save method of model
     * @method encryptData is usede to encrypt password
     */
    register = (userData, callBack) => {
        util.encryptData(userData.password, (error, encryptedData) => {
            if (error)
                throw new Error("Error while encrypting password")
            userData.password = encryptedData
            userModel.save(userData, (error, data) => {
                if (error)
                    return callBack(error, null)
                return callBack(null, data)
            })
        })

    }
}
module.exports = new UserService();