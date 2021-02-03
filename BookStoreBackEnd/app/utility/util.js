const bcrypt = require('bcrypt');
const logger = require('../logger/logger');

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