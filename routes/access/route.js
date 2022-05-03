const router = require("express").Router();
//Controller
const { accessController } = require("./controller");

router.get("/", accessController);

module.exports = router;
