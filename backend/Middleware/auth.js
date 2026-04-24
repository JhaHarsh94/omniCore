 const authMiddleWare = (req, res, next) => {
   const jwt = require("jsonwebtoken");

   const authHeader = req.headers['authorization']

   const token = authHeader && authHeader.split(" ")[1]


   
   if (!token) {
     res.status(401).json({
       success: false,
       message: "You have No token",
     });
   }
  try {

    const decode = jwt.verify(token, process.env.SECRET_KEY);

    req.user = decode;

    next();
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "got some error...",
    });
  }
};

module.exports = authMiddleWare