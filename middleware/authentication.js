const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization; // front-end sets this header if user is loged in.
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authontication invalid");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payLoad = jwt.verify(token, process.env.JWT_SECRET);

    // attach the user to the job routes
    // const user = User.findOne(payLoad.userId).select('-password');
    // req.user = user;

    // attach the user to the job routes
    req.user = { userId: payLoad.userId, name: payLoad.name }; //payLoad.userId and payLoad.name is what we have defined in user model
    //  This above new added 'req.user.userId' and 'req.user.name' is going to be accessible all the routes of jobs route
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authontication invalid");
  }
};

module.exports = auth;
