const userService = require('../services/user.js')
const Joi = require('joi');
const logger = require('../logger/logger');

const emailPattern = Joi.string().trim()
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
            }
            const validationResult = inputPattern.validate(userData)

            if (validationResult.error) {
                const response = { success: false, message: validationResult.error.message };
                return res.status(400).send(response);
            }

            userService.register(userData, (error, data) => {
                if (error) {
                   /*  if (error.name === 'MongoError' && error.code === 11000) {
                        logger.error("User with this email Id is alreday exists")
                        const response = { success: false, message: "User with this email Id is alreday exists" };
                        return res.status(409).send(response)
                    } */

                    logger.error("Some error occured while registering")
                    const response = { success: false, message: "Some error occured while registering" };
                    return res.status(500).send(response)
                }

                logger.info("Registration is done successfully !")
                const response = { success: true, message: "Registration is done successfully !", data: data };
                res.send(response)
            })
        }
        catch (error) {
            logger.error("Some error occurred !")
            const response = { success: false, message: "Some error occurred !" };
            res.status(500).send(response)
        }
    }
}

module.exports = new UserController();