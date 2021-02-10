/*************************************************************************
* Purpose : to provide methods which are most reusable
*
* @file : util.js
* @author : Shilpa K <shilpa07udupi@gmail.com>
* @version : 1.0
* @since : 02/02/2021
*
**************************************************************************/
const bcrypt = require('bcrypt');
const config = require('../../config').get();
const { logger } = config;

class Util {
    /**
        * @description Encrypting password
        * @method bcrypt.hash used to encrypt password
        * @var saltRounds is the number of rounds used for hashing
        */
    encryptData = (password, callBack) => {
        logger.info('Encrypting password')
        var saltRounds = 10;
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err)
                return callBack(err, null)
            return callBack(null, hash)
        });
    }
}

module.exports = new Util();