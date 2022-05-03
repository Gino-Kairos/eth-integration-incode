const router = require("express").Router();

router.get("/:email/:id", (req, res) => {
  res.json({ success: true });
});

module.exports = router;
