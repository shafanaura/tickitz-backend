const status = require("../helpers/Response");
const fs = require("fs");
const { validationResult } = require("express-validator");

exports.validationResult = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
      console.log("test");
    }
    console.log("tes");
    return status.ResponseStatus(res, 400, errors.array()[0].msg);
  }
  return next();
};
