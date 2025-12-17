const jwt = require("jsonwebtoken");
const { userModel } = require("../module/user");

module.exports.auth = () => {
  return async (req, res, next) => {
    // try {
      const headerToken = req.headers["authorization"];
      if (!headerToken.startsWith(`${process.env.Bearer} `)) {
        res.status(400).json({ message: "in valid header token" });
      } else {
        const token = headerToken.split(" ")[1];
        if (!token) {
          res.status(400).json({ message: "no token there" });
        } else {
          const decoded = jwt.verify(token, process.env.jwtemail);
          if (!decoded) {
            res.status(400).json({ message: "in valid token" });
          } else {
            const user = await userModel.findById(decoded.id);
            if (!user) {
              res.status(400).json({ message: "no user fonud" });
            } else {
              req.user = user;
              next();
            }
          }
        }
      }
    // } catch (error) {
    //   res.status(400).json({ message: "error catch", error });
    // }
  };
};
