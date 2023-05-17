const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  phone: Joi.string().min(9).max(15),
});

module.exports = {
  addSchema,
};
