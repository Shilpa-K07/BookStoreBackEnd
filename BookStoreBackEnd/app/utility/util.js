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
const jwt = require('jsonwebtoken');
const config = require('../../config').get();
const { logger } = config;

class Util {
    /**
    * @description Encrypting password
    * @method bcrypt.hash used to encrypt password
    * @var saltRounds is the number of rounds used for hashing
    */
    encryptData = (password, callBack) => {
        logger.info('Encrypting password');
        var saltRounds = 10;
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err)
                return callBack(err, null);
            return callBack(null, hash);
        });
    }

    /**
     * @description generate token
     * @method jwt.sign takes @var emailId and @var userId to generate token
     */
    generateToken = (user) => {
        logger.info('Generating token');
        const token = jwt.sign({
            emailId: user.emailId,
            userId: user.id
        },
            process.env.SECRET_KEY_TOKEN,
            {
                expiresIn: '1h'
            });
        return token;
    }
}

module.exports = new Util();