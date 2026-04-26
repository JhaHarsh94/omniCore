const jwt = require("jsonwebtoken");



const authMiddleWare = (req, res, next) => {

  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "You have No token",
    });
  }

  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY);

    req.user = decode;

    next()
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "got some error...",
    });
  }
};

module.exports = authMiddleWare;
