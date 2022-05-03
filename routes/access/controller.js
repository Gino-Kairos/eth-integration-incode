const files = require("../../models/file");
const users = require("../../models/user");
///

async function accessController(req, res, next) {
  try {
    if (req.query.email) {
      const findUser = await users.findOne({ email: req.query.email });
      if (findUser) {
        let data = await files.find();
        res.json({ success: true, data });
      } else {
        next({ message: "Email not exist", stack: "Email" });
      }
    } else {
      next({ message: "Email required", stack: "Email" });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { accessController };
