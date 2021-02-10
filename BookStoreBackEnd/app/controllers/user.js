/*************************************************************************
* Purpose : to recieve request from routes and forward it to service layer
*
* @file : user.js
* @author : Shilpa K <shilpa07udupi@gmail.com>
* @version : 1.0
* @since : 10/02/2021
*
**************************************************************************/
const userService = require('../services/user.js');
const validator = require('../utility/inputValidator').inputData;
//const Joi = require('joi');
const config = require('../../config').get();
const { logger } = config;
//const logger = require('../logger/logger');

/* const emailPattern = Joi.string().trim()
    .regex(/^([0-9A-Za-z])+([-+._][0-9A-Za-z]+)*@([0-9A-Za-z])+[.]([a-zA-Z])+([.][A-Za-z]+)*$/)
    .required().messages({
        'string.pattern.base': 'Email Id should be in this pattern ex: abc@gmail.com',
        'string.empty': 'Email Id can not be empty'
    })

const passwordPattern = Joi.string().trim()
    .regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.*\W){1}.*$/).min(8)
    .required().messages({
        'string.pattern.base': 'password should contain atleast one uppercase, one digit, one special character',
        'string.min': 'password length should be minimum 8',
        'string.empty': 'password can not be empty'
    })
const mobileNumberPattern = Joi.string().trim()
    .regex(/^\d{2}[-\.\s]\d{10}$/)
    .required().messages({
        'string.empty': 'mobile number can not be empty'
    })

const inputPattern = Joi.object({
    fullName: Joi.string().trim().regex(/^[a-zA-Z]+$/).min(2).required().messages({
        'string.pattern.base': 'name should contain only characters.',
        'string.min': 'first name must have minimum 2 characters.',
        'string.empty': 'first name can not be empty'
    }),
    emailId: emailPattern,
    password: passwordPattern,
    mobileNumber: mobileNumberPattern
})
 */
class UserController {
     /**
     * @description Registering new users
     * @method register is a service class method
     * @method validate validates inputs using Joi
     */
     register = (req, res) => {
        try {
            const userData = {
                fullName: req.body.fullName,
                emailId: req.body.emailId,
                password: req.body.password,
                mobileNumber: req.body.mobileNumber
            };
            const validationResult = validator.validate(userData);
            if (validationResult.error) {
                return res.status(400).send({success: false, message: validationResult.error.message});
            }

            userService.register(userData, (error, data) => {
                if (error) {
                    logger.error('Some error occured while registering');
                    return res.status(500).send({ success: false, message: 'Some error occured while registering' });
                }
                logger.info('Registration is done successfully !');
                res.send({ success: true, message: 'Registration is done successfully !', data: data });
            });
        }
        catch (error) {console.log('error: '+error);
            logger.error('Some error occurred !');
            res.status(500).send({ success: false, message: 'Some error occurred !' });
        }
    }
}

module.exports = new UserController();