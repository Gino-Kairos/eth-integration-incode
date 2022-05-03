const router = require("express").Router();
//Controller
const { registerController, loginController } = require("./controller");

router.post("/login", loginController);
router.post("/register", registerController);

module.exports = router;
