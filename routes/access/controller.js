const files = require("../../models/file");
const users = require("../../models/user");

//Dependencies
const Joi = require("joi");

//Schemas
const schemaGetQuery = Joi.object({
  email: Joi.string().email().required(),
});

async function accessController(req, res, next) {
  try {
    //Validate query params
    const checkQuery = await schemaGetQuery.validateAsync({ ...req.query });
    if (checkQuery) {
      const findUser = await users.findOne({ email: checkQuery.email });
      if (findUser) {
        let data = await files.find();
        res.json({ success: true, data });
      } else {
        next({ message: "Email not exist", stack: "Email" });
      }
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { accessController };
