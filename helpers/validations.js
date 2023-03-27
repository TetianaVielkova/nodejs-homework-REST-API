const Joi = require('joi');

const schemaContact = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
    phone: Joi.string()
        .min(6)
        .max(15)
        .required(),
    favorite: Joi.boolean(),
})

const schemaUser = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
    password: Joi.string()
        // eslint-disable-next-line prefer-regex-literals
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
})


module.exports = {
    schemaContact,
    schemaUser,
};