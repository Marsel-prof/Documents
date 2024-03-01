const {validationResult } = require("express-validator");
// middleware => catch errors from rules if exists
const validatorMiddleware = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ msg: error.array() });
  }
  // to go to next middleware i must use next() function
  next(); //! is important why? because if was no error will not go to handler it will get stuck in place
};
module.exports = validatorMiddleware;
