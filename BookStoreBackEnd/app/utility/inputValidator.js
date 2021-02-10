const Joi = require('joi');
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
module.exports = {
    inputData: inputPattern,
    email: emailPattern,
    password: passwordPattern,
    mobileNumber: mobileNumberPattern
}
