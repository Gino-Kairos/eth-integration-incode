const router = require("express").Router();
//Controllers
const { uploadController } = require("./controller");

router.post("/upload", uploadController);

module.exports = router;
