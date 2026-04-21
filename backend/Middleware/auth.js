
 const authMiddleWare = (req, res, next) => {
     try {
      const jwt = require("jsonwebtoken");

    const token = req.headers.authorization;

    if (!token) {
      res.status(401).json({
        success: false,
        message: "You have No token",
      });
    }

    const decode = jwt.verify(token.split(" ")[1], process.env.Secret_key);

    req.user = decode;

    next();
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "got some error...",
    });
  }
};



module.exports = {authMiddleWare}