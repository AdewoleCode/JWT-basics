const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");

const authenticationMiddleware = async (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("no token or invalid token", 401);
  }

  //to create an array of [bearer, tokenvalue]
  const token = authHeader.split(" ")[1];


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const {username, id } = decoded
    req.user = {username, id}
    next();

 } catch (error) {
    throw new CustomAPIError('not authorized to access this route', 401)
 }


};

module.exports = authenticationMiddleware;
