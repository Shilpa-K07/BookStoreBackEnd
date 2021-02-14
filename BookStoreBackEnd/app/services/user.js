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
            userModel.save(userData, (error, data) => {
                return error ? callBack(error, null) : callBack(null, data);
            });
        });
    }

    login = async (userLoginData) => {console.log('svc');
        const result = await userModel.findOne(userLoginData);
        console.log('service: ' + JSON.stringify(result));
        if (error) {
            logger.error('ERR:500-Some error occured while logging in');
            return new Error('ERR:500-Some error occured while logging in');
        }
        else if (!data) {
            logger.error('ERR:401-Authorization failed');
            return new Error('ERR:401-Authorization failed');
        }
        else {
            bcrypt.compare(userLoginData.password, data.password, (error, result) => {
                if (result) {
                    logger.info('Authorization success');
                    const token = util.generateToken(data);
                    data.token = token;
                    return data;
                }
                logger.error('ERR:401-Authorization failed');
                return new Error('ERR:401-Authorization failed');
            });
        }
    }
}
module.exports = new UserService();