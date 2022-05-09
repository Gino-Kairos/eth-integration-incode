const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const KEY = process.env.JWT_KEY || "kairos-test";
//models
const Users = require("../../models/user");

const schemaAuth = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

async function registerController(req, res, next) {
  try {
    const isValidRequest = await schemaAuth.validateAsync({
      ...req.body,
    });
    if (isValidRequest) {
      const { email, password } = isValidRequest;
      const emailExist = await Users.findOne({ email });

      if (!emailExist) {
        const createUser = new Users({ email, password });
        const saveUser = await createUser.save();
        res.json({
          success: true,
          message: "User is created",
          details: saveUser,
        });
      } else {
        next({ message: "Email is exist", stack: "Email invalid" });
      }
    }
  } catch (error) {
    next(error);
  }
}

async function loginController(req, res, next) {
  try {
    const isValidRequest = await schemaAuth.validateAsync({
      ...req.body,
    });
    if (isValidRequest) {
      const { email, password } = isValidRequest;
      const getUser = await Users.findOne({ email });

      if (getUser) {
        bcrypt.compare(password, getUser.password).then((isMatch) => {
          if (isMatch) {
            const payload = {
              id: getUser.id,
              email: getUser.email,
            };
            jwt.sign(
              payload,
              KEY,
              {
                expiresIn: 32000000,
              },
              (err, token) => {
                if (err) {
                  next(err);
                } else {
                  res.status(200).json({
                    success: true,
                    token: "Bearer " + token,
                  });
                }
              }
            );
          } else {
            next({
              message: "Password incorrect",
              stack: "Password incorrect",
            });
          }
        });
      } else {
        next({ message: "Unknown account", stack: "Unknown account" });
      }
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { registerController, loginController };
