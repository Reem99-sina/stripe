const joi = require("joi");

module.exports.signupvalidation = {
  body: joi
    .object()
    .required()
    .keys({
      name: joi.string().min(3).required().messages({
        "string.empty": "Name is required",
        "string.min": "Name must be at least 3 characters",
      }),
      address: joi.string().required().messages({
        "string.empty": "Address is required",
      }),

      email: joi
        .string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
          "string.empty": "Email is required",
          "string.email": "Invalid email",
        }),

      phone: joi
        .string()
        .pattern(/^\d{10,}$/)
        .required()
        .messages({
          "string.empty": "Phone is required",
          "string.pattern.base": "Phone must be at least 10 digits",
        }),

      password: joi.string().min(6).required().messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters",
      }),
    }),
};
module.exports.confirmvalidation = {
  params: joi.object().required().keys({
    token: joi.string().required(),
  }),
};
module.exports.signinvalidation = {
  body: joi
    .object()
    .required()
    .keys({
      email: joi.string().email().required(),
      password: joi.string().min(6).required().messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters",
      }),
    }),
};
