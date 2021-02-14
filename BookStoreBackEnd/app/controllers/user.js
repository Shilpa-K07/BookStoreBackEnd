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
const validator = require('../utility/inputValidator').register;
const loginValidator = require('../utility/inputValidator').login;
const config = require('../../config').get();
const { logger } = config;

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
                    if(error.message.includes('409')){
                        logger.error('User exists');
                        return res.status(409).send({ success: false, message: 'User exists' });
                    }
                    logger.error('Some error occured while registering');
                    return res.status(500).send({ success: false, message: 'Some error occured while registering' });
                }
                logger.info('Registration is done successfully !');
                res.status(200).send({ success: true, message: 'Registration is done successfully !', data: data });
            });
        }
        catch (error) {
            logger.error('Some error occurred !');
            res.status(500).send({ success: false, message: 'Some error occurred !' });
        }
    }

    /**
	 * @description User login API
	 * @method login is service class method
	 */
	login = async (req, res) => {console.log('ctr');
		try {
			const userLoginData = {
				emailId: req.body.emailId,
				password: req.body.password
			};

			const validationResult = loginValidator.validate(userLoginData);

			if (validationResult.error) {
				const response = { success: false, message: validationResult.error.message };
				return res.status(400).send(response);
			}

			const result = await userService.login(userLoginData);
            console.log('ctr: ' + JSON.stringify(result));
			/* 	if (error) {
					logger.error(error.message);
					const response = { success: false, message: error.message };
					if (error.message.includes('401'))
						return res.status(401).send(response);
					return res.status(500).send(response);
				}
				if (!data) {
					const response = { success: false, message: 'Authorization failed' };
					return res.status(401).send(response);
				}
				else {
					const userData = {
						emailId: data.emailId,
						name: data.firstName + ' ' + data.lastName
					};
					const response = { success: true, message: 'Login Successfull !', token: data.token, data: userData };
					logger.info('Login Successfull !');
					req.session.isAuth = true;
					req.session.token = data.token;
					return res.status(200).send(response);
				} */
		}
		catch (error) {console.log('error: '+error);
			logger.error('Some error occurred !');
			const response = { success: false, message: 'Some error occurred !' };
			res.status(500).send(response);
		}
	}

}

module.exports = new UserController();