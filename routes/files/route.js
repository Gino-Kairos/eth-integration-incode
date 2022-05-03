const router = require("express").Router();
//Controllers
const files = require("./controller");

router.post("/upload", files);

module.exports = router;
