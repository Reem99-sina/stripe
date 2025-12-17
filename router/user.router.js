
// const { validation } = require("../../Middleware/validation");

const userservice = require("../service/user");
const { validation } = require("../validation/common.validation");
const validationuser = require("../validation/user.validation");
const router = require("express").Router();
router.post(
  "/register",
  validation(validationuser.signupvalidation),
  userservice.signup
);
router.get(
  "/confirmEmail/:token",
  validation(validationuser.confirmvalidation),
  userservice.confirm
);
router.post(
  "/login",
  validation(validationuser.signinvalidation),
  userservice.signin
);

module.exports = router;
