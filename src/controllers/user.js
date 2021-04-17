const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const status = require("../helpers/Response");
const { FILE_URL } = process.env;
const { validationResult } = require("express-validator");
const fs = require("fs");

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.userData;
    const { password, ...data } = req.body;
    const salt = await bcrypt.genSalt();
    const initialResult = await userModel.getUsersById(id);
    if (initialResult.length < 1) {
      return status.ResponseStatus(res, 404, "User not found");
    }

    if (password) {
      const encryptedNewPassword = await bcrypt.hash(password, salt);
      const passwordResult = await userModel.updateUser(id, {
        password: encryptedNewPassword,
      });
      if (passwordResult.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "Password have been updated");
      }
      return status.ResponseStatus(res, 400, "Password cant update");
    }

    if (req.file) {
      const picture = req.file.filename;
      const uploadImage = await userModel.updateUser(id, { picture });
      if (uploadImage.affectedRows > 0) {
        if (initialResult[0].picture !== null) {
          fs.unlinkSync(`public/uploads/profile/${initialResult[0].picture}`);
        }
        return status.ResponseStatus(res, 200, "Image hash been Updated");
      }
      return status.ResponseStatus(res, 400, "Can't update Image");
    }

    const finalResult = await userModel.updateUser(id, data);
    if (finalResult.affectedRows > 0) {
      return status.ResponseStatus(res, 200, "data successfully updated", {
        ...initialResult[0],
        ...data,
      });
    }
    return status.ResponseStatus(res, 400, "Failed to update data");
  } catch (err) {
    console.log(err);
    return status.ResponseStatus(res, 400, "Bad Request");
  }
};

exports.checkValidation = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return status.ResponseStatus(res, 400, "Validation Failed", errors);
  }
};

exports.getUser = async (req, res) => {
  const { id } = req.userData;
  const results = await userModel.getUsersById(id);
  if (results.length > 0) {
    return status.ResponseStatus(res, 200, "List Detail user", {
      ...results[0],
      picture:
        results[0].picture === null
          ? results[0].picture
          : FILE_URL.concat(`profile/${results[0].picture}`),
    });
  } else {
    return status.ResponseStatus(res, 400, "User not found");
  }
};
