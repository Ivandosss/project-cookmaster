const Joi = require('joi');

const requiredSchema = Joi.object({
email: Joi.required(),
password: Joi.required(),
});

const formatSchema = Joi.object({
email: Joi.string()
.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
.required(),
password: Joi.required(),
});

const recipeSchema = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
  .required(),
  password: Joi.string().required(),
  }); 

module.exports = {
requiredSchema,
formatSchema,
recipeSchema,
userSchema,
}; 