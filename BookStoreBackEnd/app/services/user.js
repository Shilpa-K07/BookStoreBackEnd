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
const userModel = require('../models/user');
const util = require('../utility/util');
const config = require('../../config').get();
const { logger } = config;
const bcrypt = require('bcrypt');
const role = require('../utility/role');

class UserService {
    /**
     * @description user registration
     * @method register is called from controller.It again calls save method of model
     * @method encryptData is usede to encrypt password
     */
    register = (userData, callBack) => {
        util.encryptData(userData.password, (error, encryptedData) => {
            if (error) {
                logger.error('Error while encrypting password');
                throw new Error('Error while encrypting password');
            }
            userData.password = encryptedData;
            userData.role = role.User; 
            userModel.save(userData, (error, data) => {
                return error ? callBack(error, null) : callBack(null, data);
            });
        });
    }

    login =  (userLoginData, callBack) => {
        userModel.findOne(userLoginData, (error, data) => {
        if (error) {
            logger.error('ERR:500-Some error occured while logging in');
            return callBack(new Error('ERR:401-Authorization failed'), null);
        }
        else if (!data) {
            logger.error('ERR:401-Authorization failed');
            return callBack(new Error('ERR:401-Authorization failed'), null);
        }
        else {
            bcrypt.compare(userLoginData.password, data[0]['user'].password,  async (error, result) => {
                if (result) {
                    logger.info('Authorization success');
                    const token =  await util.generateToken(data);
                    data.token = token;
                    return callBack(null, data);
                }
                logger.error('ERR:401-Authorization failed');
                return callBack(new Error('ERR:401-Authorization failed'), null);
            });
        }
        });
    }
}
module.exports = new UserService();