const { check } = require("express-validator");
const Role = require("../utils/userRoles.utils");

exports.createUserSchema = [
  check("email")
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email")
    .normalizeEmail(),
  check("role")
    .optional()
    .isIn([Role.SuperAdmin, Role.Admin, Role.User])
    .withMessage("Invalid Role type"),
  check("password")
    .exists()
    .withMessage("Password is required")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters")
    .isLength({ max: 10 })
    .withMessage("Password can contain max 10 characters"),
];

exports.validateLogin = [
  check("email")
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email")
    .normalizeEmail(),
  check("password")
    .exists()
    .withMessage("Password is required")
    .notEmpty()
    .withMessage("Password must be filled"),
];

exports.validateOrder = [
  check("idMovie").notEmpty().withMessage("Movie is required"),
];
