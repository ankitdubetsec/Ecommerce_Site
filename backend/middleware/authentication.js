const jwt = require("jsonwebtoken");
const authError = require("../errors/unauthenticated");
const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("in auth middleware");
  // console.log(token);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new authError("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload);
    req.user = { id: payload.id, name: payload.name };
    next();
  } catch (error) {
    throw new authError("Authentication invalid");
  }
  //next();
};

module.exports = auth;
