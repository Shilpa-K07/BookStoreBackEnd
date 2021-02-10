/*************************************************************************
* Purpose : Development file is the default setup expected to have on a local machine to work with the development config
*
* @file : development.js
* @author : Shilpa K <shilpa07udupi@gmail.com>
* @version : 1.0
* @since : 10/02/2021
*
**************************************************************************/

const winston = require('winston');
module.exports = () => {
    return {
        port: process.env.DEV_APP_PORT || 3000,
        logger:
            winston.createLogger({
                format: winston.format.json(),
                transports: [
                    new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
                    new winston.transports.File({ filename: './logs/info.log', level: 'info' })
                ]
            }),
        database: {
            dbURL: process.env.DB_URL,
            username: process.env.COUCH_USERNAME,
            password: process.env.COUCH_PASSWORD
        },
    };
};