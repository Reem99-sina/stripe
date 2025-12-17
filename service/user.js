const { userModel } = require("../module/user");
const sendEmail = require("../util/sendEmail");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.signup = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    const isEmailExist = await userModel.findOne({ email });
    if (isEmailExist) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }
    const user = new userModel({ name, email, password, phone, address });
    const saveUser = await user.save();
    const token = jwt.sign({ id: saveUser._id }, process.env.jwtemail, {
      expiresIn: "24h",
    });
    const URL = `${process.env.domain}/api/v1/user/confirmEmail/${token}`;
    const message = `<a href=${URL}>confirm email plz</a>`;
    await sendEmail(saveUser.email, message);
    res.status(201).json({
      message: "done signup ",
      token,
      user: {
        name: saveUser.name,
        email: saveUser.email,
        address: saveUser.address,
        phone: saveUser.phone,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error catch", error: error.errorResponse });
  }
};

module.exports.confirm = async (req, res) => {
  try {
    const { token } = req.params;
    if (!token) {
      res.status(400).json({ message: "token required" });
    } else {
      const decoded = jwt.verify(token, process.env.jwtemail);
      if (!decoded) {
        res.status(400).json({ message: "in valid token " });
      } else {
        const user = await userModel.findById(decoded.id);
        if (!user) {
          res.status(400).json({ message: "no user has this id" });
        } else {
          const userupdate = await userModel.findByIdAndUpdate(user._id, {
            Confirmed: true,
          });
          res.status(200).json({ message: "done updateuser", userupdate });
        }
      }
    }
  } catch (error) {
    res.status(500).json({ message: "error catch", error });
  }
};
module.exports.signin = async (req, res) => {
  // try {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    res.status(400).json({ message: "user not existed" });
  } else {
    if (!user.Confirmed) {
      res.status(400).json({ message: "u should confirm first email" });
    } else {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        res.status(400).json({ message: "password error" });
      } else {
        const token = jwt.sign(
          { id: user._id, isLogged: true },
          process.env.jwtemail,
          { expiresIn: "24h" }
        );
        if (!token) {
          res.status(400).json({ message: "token error" });
        } else {
          res.status(200).json({
            message: "done signin",
            token,
            user: {
              name: user.name,
              email: user.email,
              address: user.address,
              phone: user.phone,
            },
          });
        }
      }
    }
  }
  // } catch (error) {
  //   res.status(500).json({ message: "error catch", error });
  // }
};
