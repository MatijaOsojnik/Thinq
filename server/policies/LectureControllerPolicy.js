const Joi = require('@hapi/joi')

module.exports = {
    update(req, res, next) {
        const schema = Joi.object({
            title: Joi.string()
                .alphanum()
                .min(8)
                .max(30)
                .messages({
                    'string.alphanum': 'Display name should only contain alpha-numeric characters',
                    'string.base': 'Display name should be a type of text',
                    'string.empty': `Please enter a name`,
                    'string.min': `Title must be longer than 8 characters`,
                    'string.max': `Title name must be shorter than 30 characters`,
                    'any.required': `Display name is a required field`
                }),
            short_description: Joi.string()
                .alphanum()
                .min(20)
                .max(60)
                .messages({
                    'string.base': 'Display name should be a type of text',
                    'string.empty': `Please enter a short description`,
                    'string.min': `Short description must be at least 20 characters long`,
                    'string.max': `Short description must be maximum 60 characters long`
                }),
            description: Joi.string()
                .min(50)
                .max(500)
                .messages({
                    'string.pattern.base': `Password must be longer than 8 characters`,
                    'string.min': `Description must be longer than 50 characters`,
                    'string.max': `Display name must be shorter than 300 characters`,
                    'string.empty': `Please write something in the description field`
                }),
            thumbnail_url: Joi.string()
            .allow(''),
            category_id: Joi.allow('', null) 
        }).unknown(true)

        const {
            error
        } = schema.validate(req.body, {
            abortEarly: false
        })

        if (error) {
            const errors = [];

            error.details.map((err) => {
                errors.push(err.message)
            })
            res.status(400).send(errors)
        } else {
            next();
        }
    }
}