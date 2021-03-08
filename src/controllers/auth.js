const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const { APP_KEY } = process.env;
const jwt = require("jsonwebtoken");
const Role = require("../utils/userRoles.utils");
const status = require("../helpers/Response");
const { APP_URL } = process.env;
const { validationResult } = require("express-validator");
const fs = require("fs");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await userModel.getUsersByCondition({ email });
    this.checkValidation(req, res);
    if (existingUser.length > 0) {
      const compare = await bcrypt.compare(password, existingUser[0].password);
      if (compare) {
        const { id } = existingUser[0];
        const token = jwt.sign({ id }, APP_KEY);
        // return status.ResponseStatus(res, 200, "Login successfully", { token });
        return res.json({
          status: true,
          message: "Login successfully",
          token,
          userData: existingUser[0],
        });
      } else {
        return status.ResponseStatus(res, 401, "Wrong email or password");
      }
    } else {
      return status.ResponseStatus(res, 401, "Email is not registered");
    }
  } catch (error) {
    return status.ResponseStatus(res, 400, "Bad request");
  }
};

exports.register = async (req, res) => {
  try {
    const { email, password, role = Role.User } = req.body;
    this.checkValidation(req, res);
    const isExist = await userModel.getUsersByCondition({ email });
    if (isExist.length < 1) {
      const salt = await bcrypt.genSalt();
      const encryptedPassword = await bcrypt.hash(password, salt);
      const createUser = await userModel.createUser({
        email,
        role,
        password: encryptedPassword,
      });
      if (createUser.insertId > 0) {
        return status.ResponseStatus(res, 200, "Register Success");
      } else {
        return status.ResponseStatus(res, 400, "Register Failed");
      }
    } else {
      return status.ResponseStatus(
        res,
        400,
        "Register Failed, Email is already exist"
      );
    }
  } catch (error) {
    return status.ResponseStatus(res, 400, "Bad request");
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
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
      const picture = `${APP_URL}${req.file.destination}/${req.file.filename}`;
      const uploadImage = await userModel.updateUser(id, { picture });
      if (uploadImage.affectedRows > 0) {
        // if (initialResult[0].picture !== null) {
        //   fs.unlink(`${initialResult[0].picture}`);
        // }
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
  const { id } = req.params;
  const results = await userModel.getUsersById(id);
  if (results.length > 0) {
    return status.ResponseStatus(res, 200, "List Detail user", results[0]);
  } else {
    return status.ResponseStatus(res, 400, "User not found");
  }
};

// test
